import { supabase, supabaseAdmin } from '../../supabase';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';

export default function TestConn() {
  const { user } = useAuth();
  const [code, setCode] = useState();
  const [cli, setClient] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    // List all files in the '19' folder
    const { data, error } = await supabaseAdmin.storage.from('machines-files').list('19');
    console.log(data);
    if (error) {
      console.log('Error:', error.message);
    } else {
      if (data.length === 0) {
        console.log('No files found in folder 19');
      } else {
        // Remove each file
        const filesToRemove = data.map((x) => `19/${x.name}`);

        const { data: removedData, error: removedError } = await supabase.storage
          .from('machines-files')
          .remove(filesToRemove);

        if (removedError) {
          console.log(removedError.message);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='align-center'>
        <label> INSERT A NAME</label>
        <input
          id='code'
          type='text'
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
        <button>submit</button>
      </div>
    </form>
  );
}
