import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const PostPreview = (props) => {
  const [showButton, setShowButton] = useState(false);

  const { t } = useTranslation(['Support']);

  function stripHtml(html) {
    return html.replace(/<[^>]*>?/gm, '');
  }

  function shortenText(text) {
    let plainText = stripHtml(text);

    if (plainText.length > 100) {
      return plainText.substring(0, 300) + '...';
    } else {
      return plainText;
    }
  }

  // console.log(props.article);
  props.article.textShorted = shortenText(props.article.text);

  return (
    <>
      <div
        className='mb-2 h-[100px] overflow-hidden '
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <div className='flex items-center gap-3'>
          <span className=' h-8 overflow-hidden text-xl text-[#393939] underline dark:text-[#FFFFFFDE]'>
            <Link to={process.env.PUBLIC_URL + '/Post/' + props.article.id}>
              {props.article.title}
            </Link>
          </span>
          {showButton && (
            <div className='flex dark:text-[#FB8500] '>
              <button
                onClick={() =>
                  props.handleArticle(props.article.id, props.article.title, props.article.text)
                }
              >
                <AiFillEdit />
              </button>
              <button
                onClick={() =>
                  props.toggleModalDeleteAr(
                    props.article.id,
                    props.article.title,
                    props.article.text,
                  )
                }
              >
                <BiTrash />
              </button>
            </div>
          )}
        </div>
        <div className='relative h-[50px] overflow-hidden  '>
          <div className=' text-neutral-500 '>{props.article.textShorted.slice(0, 200)}</div>
        </div>
        <div className='relative -top-16   z-0 h-16 w-full bg-gradient-to-t from-[#fff] to-[#87878700] dark:from-[#878787] dark:to-[#87878700]'></div>
        <div className='relative -top-[70px] z-10 mt-1 bg-white dark:bg-black'>
          <Link
            to={process.env.PUBLIC_URL + '/Post/' + props.article.id}
            className='text-[#2D9CDB] '
          >
            {t('readMore')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostPreview;
