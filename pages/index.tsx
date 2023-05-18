import Image from 'next/image';
import { LandingHeader } from '@/components';

const Landing: React.FC = () => {
  return (
    <>
      <div className='background h-[28rem] pt-6 lg:h-[46rem]'>
        <LandingHeader />
        <div className='flex flex-col items-center'>
          <div className='text-cream lg:leading-[1.4] flex flex-col items-center text-2xl mt-36 font-montserrat lg:text-6xl lg:mt-60'>
            <h1>Find any quote in</h1>
            <h1>millions of movie lines</h1>
          </div>
          <button className='mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-4 lg:px-5 rounded-md'>
            Get started
          </button>
        </div>
      </div>

      <div className='h-[31rem] relative lg:h-screen'>
        <div className='absolute inset-0'>
          <Image
            src='/assets/landing-main-1.png'
            alt='interstellar wallpaper'
            width={819}
            height={512}
            className='w-full h-full object-cover object-center'
          />
        </div>
      </div>
    </>
  );
};
export default Landing;
