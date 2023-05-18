import Image from 'next/image';

function Landing() {
  return (
    <div className='background h-screen pt-5 px-16'>
      <div className='flex justify-between'>
        <p className='uppercase text-cream'>Movie quotes</p>
        <div className='flex items-center'>
          <div className='text-white flex items-center'>
            <span>Eng</span>
            <Image
              src='/assets/lang-switch.png'
              alt='language switcher'
              width={12}
              height={10}
              className='inline ml-2'
            />
          </div>
          <button className='text-white bg-red py-[0.5rem] px-8 rounded-md mr-5 ml-10'>
            Sign Up
          </button>
          <button className='text-white py-[0.5rem] px-7 rounded-md border border-white'>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
export default Landing;
