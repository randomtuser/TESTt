import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import PostPreview from '../../components/common/postPreview/postPreview';
import ArticleModal from '../../components/common/articleModal/articleModal';
import Alert from '../../components/common/alert/alert';
import { useAuth } from '../../hooks/auth';
import { useTranslation } from 'react-i18next';
import HeaderContent from '../../components/common/headerContent/headerContent';
import Plus from '../../icons/plus';
import { getUserData, getArticles, deleteArticleId } from './api/support';
import MobileButton from '../../components/foundriesPage/mobileButton';
let articles = [];

export default function Support(props) {
  const [posts, setPosts] = useState(articles);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [showAll, setShowAll] = useState(false);
  const [userRole, setUserRole] = useState();
  const [article, setArticle] = useState({ id: '', title: '', text: '' });
  const [isOpenModalArticle, setIsOpenModalArticle] = useState(false);
  const [alertConfirmDelete, setAlertConfirmDelete] = useState(false);

  const { user } = useAuth();
  const id = user?.id;

  const { t } = useTranslation(['Support', 'Notify', 'Modals']);

  async function loadUserData() {
    let { data } = await getUserData(id);
    setUser1(data[0]);
  }

  useEffect(() => {
    loadUserData(setUser1);
    setUserRole(user1.role);
    loadArticles();
  }, []);

  const [user1, setUser1] = useState({});

  async function loadArticles() {
    let { data: articleResult } = await getArticles();
    setFilteredArticles(articleResult);
    articles = articleResult;
  }

  useEffect(() => {
    setPosts(showAll ? filteredArticles : filteredArticles.slice(0, 3));
  }, [showAll, filteredArticles]);

  const search = (e) => {
    const searchString = e.target.value.toLowerCase();
    if (searchString.length === 0) {
      setShowAll(false);
      setFilteredArticles(articles);
    } else {
      console.log(articles.length);
      setFilteredArticles(
        articles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchString) ||
            article.text.toLowerCase().includes(searchString),
        ),
      );
      setShowAll(true); // Reset showAll state when searching something
    }
  };

  const toggleModal = () => {
    setIsOpenModalArticle(!isOpenModalArticle);
  };

  const handleArticle = (id, title, text) => {
    setArticle({ id, title, text });
    toggleModal();
  };

  const deleteArticle = async () => {
    await deleteArticleId(article);
    toggleConfirmDelete();
    setFilteredArticles(filteredArticles.filter((post) => post.id !== article.id));
    props.notify(`${t('Notify:notifyArticleDelete')}`, 'success');
  };

  function toggleConfirmDelete(id, title, text) {
    setArticle({ id, title, text });
    setAlertConfirmDelete(!alertConfirmDelete);
  }

  function toggleModalEditArSuccess(article) {
    let updatedPosts = [...filteredArticles];
    let index = updatedPosts.findIndex((post) => post.id === article.id);
    updatedPosts[index] = article;
    setFilteredArticles(updatedPosts);
    props.notify(`${t('Notify:notifyArticleUpdate')}`, 'success');
  }

  const successNewArticle = (post) => {
    setFilteredArticles([...filteredArticles, post]);
    props.notify(`${t('Notify:notifyArticle')}`, 'success');
  };

  const AddArticleButton = () => {
    return (
      <button
        onClick={() => handleArticle('', '', '')}
        type='button'
        className='mr-4 flex h-full w-fit min-w-fit items-center justify-between gap-1 rounded-[5px] bg-[#FB8500] p-2.5 px-4 text-white hover:bg-orange-500'
      >
        <div className='block md:hidden'>
          <Plus />
        </div>
        <div className='hidden md:block'>{t('add')}</div>
      </button>
    );
  };

  return (
    <>
      <ArticleModal
        toggleModalEditArSuccess={toggleModalEditArSuccess}
        successNewArticle={successNewArticle}
        handleArticle={handleArticle}
        article={article}
        setArticle={setArticle}
        toggleModal={toggleModal}
        isOpen={isOpenModalArticle}
        userId={id}
      />
      <HeaderContent>
        <div className='mt-[15px] flex h-11 w-full justify-center 3xl:mt-[1.9vh] 3xl:mx-auto 3xl:w-[70%] 3xl:h-[3.7vh]'>
          <div className='flex w-3/4 items-center justify-center pl-2 pr-6'>
            <div className='relative ml-3 w-full text-gray-400'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                <button type='submit' className='focus:shadow-outline p-1 focus:outline-none'>
                  <BiSearch />
                </button>
              </span>
              <input
                type='search'
                name='s'
                className='mr-4 w-full rounded-[5px] border border-[#CCC] bg-[#e5e5e5] p-2.5 pl-10 placeholder-gray-400 dark:bg-[#0D0D0D]'
                placeholder={t('search')}
                autoComplete='off'
                onChange={search}
              />
            </div>
          </div>
          <AddArticleButton />
        </div>
      </HeaderContent>
      <div className=''>
        <MobileButton />
      </div>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='mb-4 flex w-[96%] flex-wrap rounded-[10px] bg-[#FFFFFF] pb-3 pt-2 dark:bg-[#0D0D0D] md:mt-7 md:px-5'>
          <div className='flex w-full flex-col'>
            <Alert
              confirmDelete
              isOpen={alertConfirmDelete}
              toggleModal={toggleConfirmDelete}
              title={t('Modals:sure')}
              text={t('Modals:irreversible')}
              submitFunction={deleteArticle}
            />
            <div className='pb-6'>
              <div className='items-left flex flex-col py-6 px-4 md:px-0'>
                <div className='justify-left items-left mt-2 flex w-full flex-col'>
                  {posts.map((article, index) => {
                    return (
                      <div key={index}>
                        <PostPreview
                          toggleModalDeleteAr={toggleConfirmDelete}
                          role={userRole}
                          handleArticle={handleArticle}
                          article={article}
                          toggleModal={toggleModal}
                        />
                      </div>
                    );
                  })}
                  {!showAll && filteredArticles.length > 3 ? (
                    <button onClick={() => setShowAll(true)} className='font-medium text-[#2D9CDB]'>
                      {t('showMore')}
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
