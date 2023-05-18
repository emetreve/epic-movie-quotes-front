import Image from 'next/image';

const LandingHeader: React.FC = () => {
  return (
    <div className='flex justify-between items-center text-sm lg:text-base'>
      <p className='uppercase text-cream text-md lg:text-base'>Movie quotes</p>
      <div className='flex items-center'>
        <div className='hidden lg:text-white lg:flex lg:items-center lg:static'>
          <span>Eng</span>
          <Image
            src='/assets/lang-switch.png'
            alt='language switcher'
            width={12}
            height={10}
            className='inline ml-2'
          />
        </div>
        <button className='text-white bg-red py-2 lg:py-[0.5rem] px-5 lg:px-8 rounded-md lg:mr-5 lg:ml-10'>
          Sign Up
        </button>
        <button className='text-white py-2 lg:py-[0.5rem] px-5 lg:px-8 rounded-md border border-white'>
          Log in
        </button>
      </div>
    </div>
  );
};
export default LandingHeader;
