import Image from 'next/image';

const LandingHeader: React.FC = () => {
  return (
    <div className='flex justify-between items-center text-xs lg:text-base px-5 lg:px-16 '>
      <p className='uppercase text-cream text-md lg:text-base'>Movie quotes</p>
      <div className='flex items-center'>
        <div className='hidden lg:text-white lg:flex lg:items-center lg:static'>
          <span>Eng</span>
          <Image
            src='/assets/lang-switch.png'
            alt='language switcher'
            width={768}
            height={512}
            className='inline ml-2 h-2 w-3'
          />
        </div>
        <button className='text-white bg-red py-2 lg:py-[0.5rem] px-4 lg:px-8 rounded-md lg:mr-5 lg:ml-10 order-2 lg:order-1'>
          Sign Up
        </button>
        <button className='text-white py-2 lg:py-[0.5rem] px-4 lg:px-8 rounded-md border mr-2 lg:mr-0 border-white order-1 lg:order-2'>
          Log in
        </button>
      </div>
    </div>
  );
};
export default LandingHeader;
