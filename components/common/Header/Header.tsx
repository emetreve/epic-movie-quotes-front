import Image from 'next/image';
import { PropsType } from './types';
import useHeader from './useHeader';
import { LangSwitch } from '@/components';
import { Notification } from '@/types';
import { Heart } from '@/components';

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
          <div className='inline absolute z-40 w-0 h-0 lg:top-[4.2rem] top-[3.5rem] lg:right-[17.43rem] right-[1.28rem] border-l-[1rem] border-l-transparent border-b-[1.5625rem] border-b-black border-r-[1rem] border-r-transparent'></div>
          <div className='container absolute z-50 lg:top-[5.5rem] lg:right-[4rem] lg:w-[48rem] lg:max-h-[37rem] max-h-[35rem] shadow-lg overflow-y-scroll bg-black lg:rounded-lg lg:py-9 lg:px-7 px-6'>
            <div className='flex flex-column justify-between text-white lg:my-0 my-6'>
              <h1 className='lg:text-[1.7rem] text-[1.1rem]'>Notifications</h1>
              <p
                className={`underline lg:text-base text-xs ${
                  notifications &&
                  !notifications.some(
                    (notification) => notification.end_user_id === authUserId
                  ) &&
                  'hidden'
                }`}
              >
                Mark all as read
              </p>
            </div>
            <div className='mt-4'>
              {notifications &&
                notifications.map((notification: Notification) => {
                  if (authUserId === notification.end_user_id) {
                    return (
                      <div
                        key={notification.id}
                        className='text-white h-[6.3rem] border border-gray-600 lg:rounded-md rounded-sm border-opacity-50 mt-[0.8rem] lg:px-5 px-3'
                      >
                        <div className='flex h-full flex-row items-center justify-between'>
                          <div className='flex flex-row'>
                            <div>
                              <Image
                                src={
                                  notification.user.avatar
                                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${notification.user.avatar}`
                                    : '/assets/avatar-default.png'
                                }
                                alt='user headshot'
                                width={96}
                                height={96}
                                className='lg:h-[4rem] h-[3.5rem] w-auto mr-6'
                              />
                              <div className='lg:hidden ml-3 mt-1'>
                                <p className='text-green text-sm'>New</p>
                              </div>
                            </div>
                            <div>
                              <h1>{notification.user.name}</h1>
                              {notification.comment && (
                                <div className='flex flex-row items-center mt-1'>
                                  <Image
                                    src='/assets/quote-notification.png'
                                    alt='quote notification'
                                    width={96}
                                    height={96}
                                    className='h-5 w-auto mr-[0.5rem]'
                                  />
                                  <p className='text-input-gray block lg:w-full w-[11rem] whitespace-nowrap overflow-hidden overflow-ellipsis font-light lg:text-base text-sm'>
                                    Commented to your movie quote
                                  </p>
                                </div>
                              )}
                              {notification.like_id && (
                                <div className='flex flex-row items-center mt-1'>
                                  <Heart
                                    classes={
                                      'fill-like h-5 relative right-[0.4rem]'
                                    }
                                  />
                                  <p className='text-input-gray lg:text-base text-sm font-light block relative right-[0.3rem]'>
                                    Reacted to your quote
                                  </p>
                                </div>
                              )}
                              <div className='flex-col lg:hidden'>
                                <p className='text-input-gray font-light text-sm mt-2'>
                                  5 min ago
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className='flex-col hidden lg:flex'>
                            <p className='text-input-gray font-light text-right'>
                              5 min ago
                            </p>
                            <p className='text-green text-right'>New</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              {notifications &&
                !notifications.some(
                  (notification) => notification.end_user_id === authUserId
                ) && (
                  <div
                    key='no notifications'
                    className='text-white lg:text-lg pt-4 lg:pb-0 pb-9'
                  >
                    <h1>No notifications</h1>
                  </div>
                )}
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
