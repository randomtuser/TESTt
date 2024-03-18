import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { sha256 } from '../components/common/qrCode/qrCode';
import { useAuth } from '../hooks/auth';

import { useTranslation } from 'react-i18next';

const QrResult = (props) => {
  let { qr } = props;
  qr = qr.split('/')[2];
  const { group } = useAuth();
  const [message, setMessage] = useState(undefined);
  const [queryResult, setQueryResult] = useState();
  const [object, setObject] = useState({ name: '', qty: '' });

  const navigate = useNavigate();
  const { t } = useTranslation(['Notify']);
  useEffect(() => {
    const loadMaterial = async () => {
      if (queryResult !== undefined) {
        try {
          let enc = await sha256(JSON.stringify(queryResult.object));
          if (enc === queryResult.enc_object) {
            let { data } = await supabase
              .from('materials')
              .select('material_name')
              .eq('material_id', queryResult.object.materialId);
            setObject({ name: data[0].material_name, qty: queryResult.object.qty });
          } else {
            setMessage(
              "There has been an error with the qr's integrity. Please, try again and contact an admin if the error persists.",
            );
          }
        } catch (error) {
          setMessage('There has been an error. Please, try again later.');
        }
      }
    };

    loadMaterial();
  }, [queryResult]);

  useEffect(() => {
    if (group !== undefined) {
      fetch();
    }
  }, [group]);

  const fetch = async () => {
    let { data } = await supabase.from('qr_codes').select('*').eq('code', qr);
    if (data.length === 0) {
      setMessage('This code does not exist.');
    } else {
      if (data[0].type === 'invite') {
        if (data[0].valid) {
          navigate(process.env.PUBLIC_URL + '/signupuser/' + qr);
        } else {
          setMessage(
            'This invitation code is not valid right now. The administrator should keep the invite window open in order to enable the code.',
          );
        }
      } else if (data[0].type === 'material') {
        if (data[0].valid) {
          setQueryResult(data[0]);
          setMessage('');
        } else {
          setMessage('This code is not valid anymore.');
        }
      }
    }
  };

  const disableQrUsed = async () => {
    await supabase.from('qr_codes').update({ valid: false }).eq('code', qr);
  };

  const addStock = async () => {
    let { data: valid } = await supabase.from('qr_codes').select('valid').eq('code', qr);
    if (valid[0].valid) {
      let { data: material_stock } = await supabase
        .from('material_stock')
        .select('*')
        .eq('client', group)
        .eq('material_type', queryResult.object.materialId);
      if (material_stock.length === 0) {
        await supabase
          .from('material_stock')
          .insert([
            { client: group, material_type: queryResult.object.materialId, qty: object.qty },
          ]);
        const { data, error } = await supabase.from('group_notifications').insert({
          group_id: group,
          data: { qty: object.qty, newMaterial: object.name },
          // message:
          //   'A new material has been added. Now, you have ' + object.qty + ' cm3 of ' + object.name,
          type: 4,
        });
        props.notify(`${t('notifyQrMaterial')}`, 'success');
      } else {
        await supabase
          .from('material_stock')
          .update({ qty: parseInt(material_stock[0].qty) + parseInt(object.qty) })
          .eq('client', group)
          .eq('material_type', queryResult.object.materialId);

        await supabase.from('group_notifications').insert({
          group_id: group,
          data: {
            qty: parseInt(material_stock[0].qty) + parseInt(object.qty),
            updatedMaterial: object.name,
          },
          // message:
          //   'Your stock has been updated. Now, you have ' +
          //   (parseInt(material_stock[0].qty) + parseInt(object.qty)) +
          //   ' cm3 of ' +
          //   object.name,
          type: 5,
        });

        props.notify(`${t('notifyQrMaterial')}`, 'success');
      }
      disableQrUsed();
      props.toggleScanner();
    } else {
      props.notify(`${t('notifyQrRedeemed')}`, 'error');
    }
  };

  return (
    <div className='h-full w-full'>
      <div className='flex justify-center'>
        {message === undefined ? (
          ''
        ) : (
          <div className='flex h-48 w-4/5 flex-col items-center p-4 md:w-1/2'>
            <div className='h-full w-full text-center'>
              {message === undefined ? (
                ''
              ) : message === '' ? (
                <div className='flex h-full flex-col items-center justify-between'>
                  <div>Material: {object.name}</div>
                  <div>Quantity: {object.qty}</div>
                  <div>
                    <span>Is this data correct?</span>
                  </div>
                  <div>
                    <button className='focus:shadow-outline rounded py-2 px-4 font-bold focus:outline-none'>
                      <a href='mailto:support@metalmaker3d.com'>Contact support</a>
                    </button>
                    <button
                      onClick={addStock}
                      className='focus:shadow-outline rounded bg-[#FB8500] py-2 px-4 font-bold text-white hover:bg-orange-500 focus:outline-none'
                    >
                      Add to stock
                    </button>
                  </div>
                </div>
              ) : (
                <div>{message}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrResult;
