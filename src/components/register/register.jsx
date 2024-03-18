import { MdOutlineSaveAs } from 'react-icons/md';

const Register = (props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex w-full flex-wrap justify-center gap-2'>
        {props.inputs.map((input, index) => {
          if (input.type === 'select') {
            return (
              <div className={`flex flex-col w-${input.width} `} key={index}>
                <label className='w-full' for={input.name}>
                  {input.label}
                </label>
                <select
                  className={`w-full rounded-md border border-gray-400 p-2`}
                  name={input.name}
                  id={input.name}
                >
                  {input.placeholder.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          } else if (input.type === 'file') {
            return (
              <div className={`flex flex-col w-${input.width} `} key={index}>
                <h2>{input.label}</h2>
                <label
                  for={input.name}
                  className='w-full border-2 border-dashed border-gray-400 p-2 text-center'
                >
                  {input.placeholder}
                </label>
                <input
                  className='invisible w-0 opacity-0'
                  type={input.type}
                  name={input.name}
                  id={input.name}
                />
              </div>
            );
          } else {
            return (
              <div className={`flex flex-col w-${input.width} grow-0`} key={index}>
                <label for={input.name}>{input.label}</label>
                <input
                  className={`w-full rounded-md border border-gray-400 p-2`}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                />
              </div>
            );
          }
        })}
      </div>
      <div className='flex w-full justify-center'>
        <button className='w-1/4 rounded bg-slate-800 py-2 px-4 font-bold text-white hover:bg-blue-700'>
          <MdOutlineSaveAs className='mr-2 inline-block  ' size={25} />
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
