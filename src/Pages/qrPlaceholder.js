import React, { useEffect, useState } from 'react';
import QrCode, { generateCode, sha256 } from '../components/common/qrCode/qrCode';
import { supabase } from '../supabase';
import { useAuth } from '../hooks/auth';

const QrPlaceholder = (props) => {
  const [materialId, setMaterialId] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState('');
  const [qrVal, setqrVal] = useState('');

  const [materialArray, setMaterialArray] = useState([]);

  const { user } = useAuth();
  const id = user?.id;
  const [user1, setUser1] = useState({});

  async function loadUserData() {
    let { data } = await supabase.from('profiles').select().eq('id', id);
    setUser1(data[0]);
  }
  useEffect(() => {
    loadUserData(setUser1);
  }, [user]);

  /*   const loadMaterials = async () => {
    let { data } = await supabase
      .from('materials')
      .select('material_id,material_name')
      .order('material_name');
    setMaterialArray(data);
  }; */

  useEffect(() => {
    if (materialArray[0] !== undefined) {
      setMaterialId(materialArray[0].material_id);
    }
  }, [materialArray]);

  const newMaterialQr = async () => {
    if (materialId === '' || materialQuantity === '') {
      setqrVal('');
      //props.notify(`${t('notifyQrFields')}`, 'error');
    } else {
      let code = generateCode(30);
      let item = {
        code: code,
        company: user1.group,
        materialId: materialId,
        qty: materialQuantity,
      };
      let enc_item = await sha256(JSON.stringify(item));
      const { data } = await supabase
        .from('qr_codes')
        .insert([
          {
            company: user1.group,
            code: code,
            type: 'material',
            valid: true,
            object: item,
            enc_object: enc_item,
          },
        ])
        .select();
      setqrVal(data[0].code);
    }
  };

  return (
    <div className='h-full w-full '>
      <div className='mt-10 flex w-full items-center justify-center'>
        <div className='flex h-64 w-4/5 flex-col justify-between rounded border border-zinc-600 bg-zinc-100 p-4 md:w-1/2'>
          <div>
            <div className='flex w-full items-center'>
              <div className='w-1/5 text-center'>Material name: </div>
              <select
                className='block w-4/5 rounded-lg border border-gray-200 p-2.5 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400 '
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
              >
                {materialArray.map((mat) => (
                  <option value={mat.material_id} key={mat.material_id}>
                    {mat.material_name}
                  </option>
                ))}
              </select>
            </div>

            <div className='mt-4 flex w-full items-center'>
              <div className='w-1/5 text-center'>Quantity:</div>
              <input
                type='number'
                className='block w-4/5 rounded-lg border border-gray-200 p-2.5 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400 '
                value={materialQuantity}
                onChange={(e) => setMaterialQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className='mt-6 flex w-full justify-center'>
            <button
              className='focus:shadow-outline rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
              onClick={newMaterialQr}
            >
              Create qr
            </button>
          </div>
        </div>
      </div>
      <div className='mt-3 flex w-full flex-col items-center'>
        <div className='text-xl'>
          Scan with MetalMaker3d's built-in <span className='font-bold text-blue-500'>scanner</span>{' '}
          located in the header.
        </div>
        <div>{qrVal !== '' && '192.168.100.227:3000/qr/' + qrVal}</div>
        <div>{qrVal !== '' && <QrCode code={'/qr/' + qrVal} />}</div>
      </div>
    </div>
  );
};

export default QrPlaceholder;
