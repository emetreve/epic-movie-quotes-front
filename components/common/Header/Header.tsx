import { useEffect } from 'react';
import Image from 'next/image';
import { PropsType } from './types';
import useHeader from './useHeader';
import { LangSwitch } from '@/components';
import { usePusher } from '@/hooks';
import { Notification } from '@/types';

const Header: React.FC<PropsType> = ({
  hideSearch,
  userName,
  avatar,
  authUserId,
}) => {
  const {
    handleLogout,
    t,
    showBrugerMenu,
    showBurger,
    handleNavigation,
    router,
    showSearchMobile,
    showSearchMob,
    receiveNotifications,
    showNotifications,
    notifications,
  } = useHeader();

  usePusher();

  useEffect(() => {
    const channelLike = window.Echo.private(
      `notification-updated.${authUserId}`
    );
    channelLike.listen('NotificationUpdated', function (data) {
      console.log(data);
    });

    return () => {
      // channelLike.stopListening(`.NotificationUpdated.${authUserId}`);
    };
  }, []);

  return (
    <>
      {!showSearchMobile && (
        <div className='flex relative lg:hidden justify-between items-center py-6 text-xs lg:text-base lg:px-16 bg-violet bg-opacity-80'>
          <Image
            src='/assets/burger-menu.png'
            alt='burger menu dropdown'
            width={96}
            height={96}
            className='lg:hidden inline h-5 w-auto hover:cursor-pointer px-7'
            onClick={() => {
              showBurger(true);
            }}
          />
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className={`${
              !showBrugerMenu && 'hidden'
            } w-[20rem] absolute top-0 h-[37rem] z-50 bg-profile-dark-blue rounded-lg shadow-lg px-7 pb-8 pt-6`}
          >
            <div className='flex flex-row mt-8'>
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
              <div className='ml-4 mt-1 h-fit'>
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
                onClick={() => {
                  showSearchMob(true);
                }}
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
      )}

      {showNotifications && (
        <div>
          <div className='hidden lg:inline absolute w-0 h-0 top-[4.2rem] z-[100] right-[17.75rem] border-l-[1rem] border-l-transparent border-b-[1.5625rem] border-b-black border-r-[1rem] border-r-transparent'></div>
          <div className='container absolute z-50 lg:top-[5.5rem] lg:right-[4rem] lg:w-[52rem] lg:max-h-72 shadow-lg overflow-y-scroll bg-black rounded-lg lg:py-4 lg:px-6'>
            <div className='flex flex-column justify-between text-white'>
              <h1 className='text-xl'>Notifications</h1>
              <p className='underline'>Mark all as read</p>
            </div>
            <div>
              {notifications &&
                notifications.map((notification: Notification) => {
                  return (
                    <div key={notification.id} className='text-white'>
                      <p>{notification.created_at}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      <div className='hidden lg:flex justify-between items-center py-5 text-base px-16 bg-violet bg-opacity-80'>
        <p className='uppercase text-cream text-base'>Movie quotes</p>
        <div className='flex items-center'>
          <Image
            src='/assets/notifications-bell.png'
            alt='notifications bell'
            width={96}
            height={96}
            className='h-7 w-auto mr-7 hover:cursor-pointer'
            onClick={receiveNotifications}
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
