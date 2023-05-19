import { LandingHeader, Poster, Footer, CreateAccount } from '@/components';

const Landing: React.FC = () => {
  return (
    <>
      <CreateAccount />
      <div className='background h-[40rem] pt-6 lg:h-[52rem]'>
        <LandingHeader toggleAccount />
        <div className='flex flex-col items-center h-[25rem] lg:h-[43rem]'>
          <div className='text-cream lg:leading-[1.4] flex flex-col items-center text-2xl mt-36 font-montserrat lg:text-6xl lg:mt-60'>
            <h1>Find any quote in</h1>
            <h1>millions of movie lines</h1>
          </div>
          <button className='mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-4 lg:px-5 rounded-md'>
            Get started
          </button>
        </div>
        <main>
          <Poster
            image='/assets/landing-main-1.png'
            alt='Interstellar wallpaper'
            quote='You have to leave something behind to go forward'
            signature='Interstellar, 2014'
            mobileTop='pt-36'
            desktopTop='lg:pt-72'
            priority={true}
          />
          <Poster
            image='/assets/landing-main-2.png'
            alt='The Royal Tenenbaums wallpaper'
            quote="I think we're just gonna have to be secretly in love with earch other and leave it that"
            signature='The Royal Tenenbaums, 2001'
            mobileTop='pt-[8.75rem]'
            desktopTop='lg:pt-[28rem]'
          />
          <Poster
            image='/assets/landing-main-3.png'
            alt='The Royal Tenenbaums wallpaper'
            quote='I see in your eyes the same fear that would take the heart of me....'
            signature='The Lord of the Rings, 2003'
            mobileTop='pt-[10.625rem]'
            desktopTop='lg:pt-[38rem]'
          />
        </main>
        <Footer />
      </div>
    </>
  );
};
export default Landing;
