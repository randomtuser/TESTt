import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Tooltip from '../tooltip/tooltip';
import { BiHelpCircle } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const ArticleModal = ({
  article,
  isOpen,
  toggleModal,
  toggleModalEditArSuccess,
  successNewArticle,
  userId,
}) => {
  const [title, setTitle] = useState(article.title);
  const [text, setText] = useState(article.text);
  const [errors, setErrors] = useState(false);
  const errorMsg = 'The field cannot be empty';

  const { t } = useTranslation(['FAQ']);

  useEffect(() => {
    if (article.id === '') {
      setTitle('');
      setText('');
      setErrors(false);
    } else {
      setTitle(article.title);
      setText(article.text);
      setErrors(false);
    }
  }, [article]);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    let pruebaError = false;
    setErrors(false);
    let newArticle = [];
    if (text === '' || title === '') {
      setErrors(true);
      pruebaError = true;
    }
    if (title !== article.title) {
      newArticle = { ...newArticle, title: title };
    }
    if (text !== article.text) {
      newArticle = { ...newArticle, text: text };
    }
    if (article.id !== '' && newArticle !== '' && !errors) {
      // edit post
      await supabase.from('articles').update(newArticle).eq('id', article.id);
      toggleModal();
      toggleModalEditArSuccess({ id: article.id, title: title, text: text });
    } else if (article.id === '' && !pruebaError) {
      // new post
      newArticle = { ...newArticle, user_id: userId };
      let { data } = await supabase.from('articles').insert(newArticle).select();
      successNewArticle(data[0]);
      toggleModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-10 flex items-center justify-center font-poppins'>
          <div onClick={toggleModal} className='absolute inset-0 bg-gray-700 opacity-50' />
          <div className='relative flex w-4/5 flex-col items-center gap-4 rounded-[10px] bg-gray-100 p-2 py-5 dark:bg-[#0d0d0d] dark:text-darkWhite md:w-2/4 lg:w-2/3'>
            <div className='flex h-full w-full flex-col items-center justify-center'>
              <button onClick={toggleModal} className='absolute top-0 right-0 m-2'>
                <AiOutlineCloseCircle size={20} />
              </button>
              <div className='flex w-full items-center justify-center py-2'>
                {article.id === '' && <h1 className='text-2xl'>{t('new')}</h1>}
                {article.id !== '' && <h1 className='text-2xl'>{t('edit')}</h1>}
              </div>

              <div className='flex w-full justify-start py-2'>
                <div className='mt-2 flex w-2/12 justify-center px-5 text-center'>
                  {t('title')}:
                </div>
                <div className='w-full px-2'>
                  {errors && title === '' && (
                    <span className='text-left text-sm text-red-500'>{errorMsg}</span>
                  )}
                  <input
                    className={`h-12 w-full rounded-lg border bg-transparent px-2 py-2 text-sm text-gray-700 dark:text-darkWhite
                      ${errors && title === '' ? `border-red-500 ` : ''} 
                      `}
                    type='text'
                    id='title'
                    value={title}
                    onChange={handleChangeTitle}
                  />
                </div>
              </div>
              <div className='flex w-full justify-start  py-2'>
                <div className='relative mt-2 flex h-fit w-2/12 justify-center px-5 text-center'>
                  {t('text')}:
                  <div className='absolute right-3'>
                    <Tooltip text={t('html')}>
                      <BiHelpCircle size={20} />
                    </Tooltip>
                  </div>
                </div>
                <div className='w-full px-2'>
                  {errors && text === '' && (
                    <span className='text-left text-sm text-red-500'>{errorMsg}</span>
                  )}

                  <textarea
                    id='text'
                    className={`h-64 w-full resize-none rounded-lg border bg-transparent px-2 py-2 text-sm text-gray-700 dark:text-darkWhite
                      ${errors && text === '' ? `border-red-500 ` : ''}
                      `}
                    value={text}
                    onChange={handleChangeText}
                  />
                </div>
              </div>
              <div className='flex w-full justify-center py-2'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className='hover:bg- mr-2 mb-2 rounded-lg bg-[#FB8500] px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 '
                >
                  {t('submit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ArticleModal;
