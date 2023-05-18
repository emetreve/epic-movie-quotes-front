import { LandingHeader, Poster } from '@/components';

const Landing: React.FC = () => {
  return (
    <>
      <div className='background h-[40rem] pt-6 lg:h-[52rem]'>
        <LandingHeader />
        <div className='flex flex-col items-center h-[25rem] lg:h-[43rem]'>
          <div className='text-cream lg:leading-[1.4] flex flex-col items-center text-2xl mt-36 font-montserrat lg:text-6xl lg:mt-60'>
            <h1>Find any quote in</h1>
            <h1>millions of movie lines</h1>
          </div>
          <button className='mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-4 lg:px-5 rounded-md'>
            Get started
          </button>
        </div>

        <Poster image='/assets/landing-main-1.png' />
      </div>
    </>
  );
};
export default Landing;
