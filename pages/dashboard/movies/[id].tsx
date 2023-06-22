import { useMovie } from '@/hooks';
import Image from 'next/image';
import { Header, SideProfilePanel } from '@/components';

const Movie = () => {
  const { id, logged, user } = useMovie();

  if (logged) {
    return (
      <>
        <div
          id='movies'
          //   onClick={handleOutsideClick}
          className='min-h-screen bg-gradient-violet relative'
        >
          <div className='h-[5rem]'>
            <Header
              hideSearch={true}
              userName={user.name}
              avatar={user.avatar}
              authUserId={user.id}
            />
          </div>

          <div className='w-[25%] fixed'>
            <SideProfilePanel avatar={user.avatar} name={user.name} />
          </div>

          <div className='lg:px-[4rem] px-7 pb-16 lg:ml-[25%] lg:w-[75%] w-full lg:mt-[2rem]'>
            <div className='text-xl text-white mt-3 lg:block hidden'>
              <p>Movie description</p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Movie;
