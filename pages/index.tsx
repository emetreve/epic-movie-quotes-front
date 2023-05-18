import { LandingHeader } from '@/components';

const Landing: React.FC = () => {
  return (
    <div className='background h-screen pt-6'>
      <LandingHeader />

      <div className='flex flex-col items-center'>
        <div className='text-cream flex flex-col items-center text-2xl mt-36 font-montserrat lg:text-6xl lg:mt-72'>
          <h1>Find any quote in</h1>
          <h1>millions of movie lines</h1>
        </div>
        <button className='mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-4 lg:px-5 rounded-md'>
          Get started
        </button>
      </div>
    </div>
  );
};
export default Landing;
