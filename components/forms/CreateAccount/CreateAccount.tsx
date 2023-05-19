import { PropsType } from './types';

const CreateAccount: React.FC<PropsType> = ({ show }) => {
  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='modal-tint h-full w-full lg:h-80 lg:w-36'>
        <div className='flex flex-col items-center justify-center h-36 mt-6'>
          <h1 className='text-xl'>Create an account</h1>
          <p className='text-gray-500 text-sm mt-3'>Start your journey!</p>
        </div>

        <form className='w-full px-8 text-sm'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='mb-2'>
              Name <span className='text-red'>*</span>
            </label>
            <input
              //   {...register('first_name', {
              //     required: 'სახელის ველი სავალდებულოა',
              //     minLength: {
              //       value: 3,
              //       message: 'სახელის ველი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან',
              //     },
              //     onChange: (e) => {
              //       localStorage.setItem('first_name', e.target.value);
              //     },
              //   })}
              id='name'
              placeholder='Enter your name'
              className='bg-input-gray text-txt-black py-[0.6rem] px-3 w-full placeholder-gray-500 rounded'
            />
            <div className='h-4'>
              {/* {errors?.first_name && (
                <Error content={errors.first_name.message} />
              )} */}
            </div>
          </div>

          <div className='flex flex-col mt-3'>
            <label htmlFor='email' className='mb-2'>
              Email <span className='text-red'>*</span>
            </label>
            <input
              id='email'
              placeholder='Enter your email'
              className='bg-input-gray text-txt-black py-[0.6rem] px-3 w-full placeholder-gray-500 rounded'
            />
            {/* <div className='h-4'>ERROR HERE</div> */}
          </div>

          <div className='flex flex-col mt-6'>
            <label htmlFor='password' className='mb-2'>
              Password <span className='text-red'>*</span>
            </label>
            <input
              id='password'
              placeholder='Password'
              className='bg-input-gray text-txt-black py-[0.6rem] px-3 w-full placeholder-gray-500 rounded'
            />
            {/* <div className='h-4'>ERROR HERE</div> */}
          </div>

          <div className='flex flex-col mt-6'>
            <label htmlFor='password_confirmation' className='mb-2'>
              Confirm password <span className='text-red'>*</span>
            </label>
            <input
              id='password_confirmation'
              placeholder='Password'
              className='bg-input-gray text-txt-black py-[0.6rem] px-3 w-full placeholder-gray-500 rounded'
            />
            {/* <div className='h-4'>ERROR HERE</div> */}
          </div>
        </form>

        <button onClick={() => show(false)}>Close</button>
      </div>
    </div>
  );
};

export default CreateAccount;
