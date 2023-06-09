import Image from 'next/image';
import { PropsType } from './types';
import useHeader from './useHeader';
import { LangSwitch } from '@/components';

const Header: React.FC<PropsType> = ({ hideSearch, userName, avatar }) => {
  const {
    handleLogout,
    t,
    showBrugerMenu,
    setShowBurgerMenu,
    handleNavigation,
    router,
  } = useHeader();

  return (
    <>
      <div className='flex relative lg:hidden justify-between items-center py-6 text-xs lg:text-base lg:px-16 bg-violet bg-opacity-80'>
        <Image
          src='/assets/burger-menu.png'
          alt='burger menu dropdown'
          width={96}
          height={96}
          className='lg:hidden inline h-5 w-auto hover:cursor-pointer px-7'
          onClick={() => {
            setShowBurgerMenu((prev) => !prev);
          }}
        />
        <div
          className={`${
            !showBrugerMenu && 'hidden'
          } w-80 absolute top-0 h-[37rem] z-50 bg-profile-dark-blue rounded-md shadow-lg px-7 py-8`}
        >
          <div className='flex flex-row'>
            <Image
              src={
                avatar
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${avatar}`
                  : '/assets/avatar-default.png'
              }
              alt='user headshot'
              width={512}
              height={512}
              className={`${
                router.pathname.includes('profile') &&
                'border border-red rounded-[50%]'
              } h-10 w-10 rounded-[50%] mr-2 mt-2`}
            />
            <div className='ml-3'>
              <p className='text-lg text-white'>{userName}</p>
              <p
                onClick={() => {
                  handleNavigation('profile');
                }}
                className='text-gray-400'
              >
                {t('Edit your profile')}
              </p>
            </div>
          </div>
          <div className='flex flex-row mt-8 ml-2'>
            <Image
              src={
                router.pathname.includes('newsfeed')
                  ? '/assets/home-red.png'
                  : '/assets/home-wht.png'
              }
              alt='home'
              width={512}
              height={462}
              className='h-5 w-auto mr-3'
            />
            <p
              onClick={() => {
                handleNavigation('newsfeed');
              }}
              className='text-[0.9rem] inline-block ml-5 text-white'
            >
              {t('News feed')}
            </p>
          </div>
          <div className='flex flex-row mt-6 ml-2'>
            <Image
              src='/assets/movie-camera.png'
              alt='camera for shooting movies'
              width={512}
              height={462}
              className='h-5 w-auto mr-3'
            />
            <p className='text-[0.9rem] inline-block ml-5 text-white'>
              {t('List of movies')}
            </p>
          </div>
          <div className='flex flex-row mt-16 ml-2 border-t border-violet pt-5 mr-5'>
            <button
              onClick={handleLogout}
              className='text-white opacity-80 text-xs h-8 px-3 rounded-md border ml-2 border-white hover:cursor-pointer'
            >
              {t('Log out')}
            </button>
            <div className='ml-4 mt-1'>
              <LangSwitch fromBurgerMenu={true} />
            </div>
          </div>
        </div>
        <div className='flex items-center px-7'>
          {!hideSearch && (
            <Image
              src='/assets/search-magnifying-glass.png'
              alt='search magnifying glass'
              width={96}
              height={96}
              className='lg:hidden inline ml-2 h-5 w-auto hover:cursor-pointer'
            />
          )}
          <Image
            src='/assets/notifications-bell.png'
            alt='notifications bell'
            width={96}
            height={96}
            className='lg:hidden inline ml-4 h-5 w-auto hover:cursor-pointer'
          />
        </div>
      </div>

      <div className='hidden lg:flex justify-between items-center py-5 text-base px-16 bg-violet bg-opacity-80'>
        <p className='uppercase text-cream text-base'>Movie quotes</p>
        <div className='flex items-center'>
          <Image
            src='/assets/notifications-bell.png'
            alt='search magnifying glass'
            width={96}
            height={96}
            className='h-7 w-auto mr-7 hover:cursor-pointer'
          />
          <LangSwitch />
          <button
            onClick={handleLogout}
            className='ml-9 text-white py-[0.5rem] px-6 rounded-md border mr-0 border-white hover:cursor-pointer'
          >
            {t('Log out')}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
