import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../../supabase';

const PostView = (props) => {
  const [post, setPost] = useState({});

  const { id } = useParams();

  const loadArticle = async () => {
    const { data: articles } = await supabase.from('articles').select('*').eq('id', id);
    setPost(articles[0]);
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <>
      <div className='flex w-full justify-center dark:bg-[#1B1B1B] dark:text-[#FFFFFFDE]'>
        <div className='w-11/12 p-4'>
          <h1 className='mb-4 text-3xl font-bold'>{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: post.text }}></p>
        </div>
      </div>
    </>
  );
};

export default PostView;
