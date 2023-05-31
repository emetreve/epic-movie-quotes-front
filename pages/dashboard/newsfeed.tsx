import Image from 'next/image';
import { useNewsFeed } from '@/hooks';
import { Header } from '@/components';

const Newsfeed = () => {
  const { logged } = useNewsFeed();

  if (logged) {
    return (
      <div className='bg-gradient-violet min-h-screen'>
        <Header />
        <div className='lg:hidden hover:cursor-pointer flex px-7 py-9 items-center'>
          <Image
            src='/assets/write-new-quote.png'
            alt='write new quote'
            width={96}
            height={96}
            className='h-5 w-auto mr-3'
          />
          <p className='text-white text-sm'>Write new quote</p>
        </div>

        <div className='hidden lg:flex text-white px-16 pt-10'>
          <div className='w-[25%]'>
            <div className='flex flex-row'>
              <Image
                src='/assets/avatar-default.png'
                alt='user headshot'
                width={512}
                height={512}
                className=' h-16 w-auto mr-3'
              />
              <div className='ml-3 pt-1'>
                <p className='text-xl'>Nino Tabagari</p>
                <p className='text-gray-400'>Edit your profile</p>
              </div>
            </div>
            <div className='flex flex-row mt-9 ml-3'>
              <Image
                src='/assets/home-red.png'
                alt='home'
                width={512}
                height={462}
                className='h-7 w-auto mr-3'
              />
              <p className='text-xl inline-block ml-5'>News feed</p>
            </div>
            <div className='flex flex-row mt-10 ml-3'>
              <Image
                src='/assets/movie-camera.png'
                alt='home'
                width={512}
                height={462}
                className='h-7 w-auto mr-3'
              />
              <p className='text-xl inline-block ml-5'>List of movies</p>
            </div>
          </div>

          <div className='w-[50%]'>
            <div className='flex frex-row justify-between'>
              <div className='h-12 flex flex-row items-center bg-violet bg-opacity-80 w-[82%] rounded-lg text-lg'>
                <Image
                  src='/assets/write-new-quote.png'
                  alt='home'
                  width={96}
                  height={96}
                  className='h-6 w-auto ml-3 mr-4'
                />
                <p>Write new quote</p>
              </div>
              <div className='h-12 flex flex-row items-center mr-3 text-lg'>
                <Image
                  src='/assets/search-magnifying-glass.png'
                  alt='home'
                  width={96}
                  height={96}
                  className='h-[1.2rem] w-auto mr-5'
                />
                <p className='text-gray-400'>Search by</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Newsfeed;
