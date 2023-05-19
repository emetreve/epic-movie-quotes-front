import { PropsType } from './types';

const CreateAccount: React.FC<PropsType> = ({ show }) => {
  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-violet h-full w-full lg:h-80 lg:w-36 '>
        <h1 className='text-7xl'>Form</h1>
        <button onClick={() => show(false)}>Close</button>
      </div>
    </div>
  );
};

export default CreateAccount;
