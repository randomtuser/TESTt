import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import { sha256 } from '../components/common/qrCode/qrCode';

const QrInvited = (props) => {
  const { qr } = useParams();
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      let { data } = await supabase.from('qr_codes').select('*').eq('code', qr);
      if (data.length === 0) {
        setMessage('This code does not exist.');
      } else {
        let sha = await sha256(JSON.stringify(data[0].object));
        if (sha === data[0].enc_object) {
          // if (true) {
          if (data[0].valid) {
            if (data[0].type === 'invite') {
              navigate(process.env.PUBLIC_URL + '/signupuser/' + qr);
            }
          } else {
            setMessage(
              'This invitation code is not valid right now. The administrator must keep the invite window open in order to enable the code.',
            );
          }
        } else {
          setMessage(
            "There has been an error with the qr's integrity. Please, try again and contact an admin if the error persists.",
          );
        }
      }
    };
    fetch();
  }, []);

  return (
    <div className='h-full w-full '>
      <div className='mt-10 flex justify-center'>
        {message === '' ? (
          ''
        ) : (
          <div className='flex h-48 w-4/5 flex-col items-center justify-between rounded border border-zinc-600 bg-zinc-100 p-4 md:w-1/2'>
            <div className='w-full text-center'>{message}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrInvited;
