import Image from 'next/image';
import { PropsType } from './types';
import useHeader from './useHeader';
import { LangSwitch } from '@/components';
import { Notification } from '@/types';
import { Heart } from '@/components';
import { getTimeAgo } from '@/helpers';
import { Home, Camera, ViewQuote, EditQuote } from '@/components';

const Header: React.FC<PropsType> = ({
  hideSearch,
  userName,
  avatar,
  authUserId,
}) => {
  const {
    handleLogout,
    t,
    showBurger,
    handleNavigation,
    router,
    showModal,
    showSearchMob,
    toggleNotifications,
    showNotifications,
    notifications,
    handleMarkNotificationsRead,
    notificationBellCounter,
    whichQuoteToView,
    setWhichQuoteToView,
    handleNotificationClicked,
    whichQuoteToEdit,
    setWhichQuoteToEdit,
    editQuoteData,
    setEditQuoteData,
    handleOutsideClick,
  } = useHeader(authUserId);

  return (
    <>
      {whichQuoteToView && (
        <ViewQuote
          authUserId={authUserId}
          authUserAvatar={avatar}
          authUserName={userName}
          whichQuoteToView={whichQuoteToView}
          setWhichQuoteToView={setWhichQuoteToView}
          setWhichQuoteToEdit={setWhichQuoteToEdit}
          setEditQuoteData={setEditQuoteData}
        />
      )}

      {whichQuoteToEdit && (
        <EditQuote
          authUserAvatar={avatar}
          authUserName={userName}
          whichQuote={whichQuoteToEdit}
          setWhichQuote={setWhichQuoteToEdit}
          quoteData={editQuoteData}
        />
      )}

      <div onClick={handleOutsideClick} className='fixed w-full z-[40]'>
        {showModal !== 'showSearchMobile' && (
          <div className='flex relative lg:hidden justify-between items-center py-6 text-xs lg:text-base lg:px-16 bg-violet'>
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
                showModal !== 'showBrugerMenu' && 'hidden'
              } w-[20rem] absolute top-0 h-[37rem] z-50 bg-profile-dark-blue rounded-lg shadow-lg px-7 pb-8 pt-6`}
            >
              <div className='flex flex-row mt-8 items-center'>
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
                    router.pathname.includes('profile') && 'border border-red'
                  } h-11 w-11 rounded-[50%] mr-2 mt-2`}
                />
                <div className='ml-2'>
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
              <div className='flex flex-row mt-8 ml-1 items-center'>
                <Home
                  classes={
                    router.pathname.includes('newsfeed')
                      ? 'fill-red h-5'
                      : 'fill-white h-5'
                  }
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
              <div className='flex flex-row mt-6 ml-[0.33rem] items-center'>
                <Camera
                  classes={
                    router.pathname.includes('movies')
                      ? 'fill-red h-5'
                      : 'fill-white h-5'
                  }
                />
                <p
                  onClick={() => {
                    handleNavigation('movies');
                  }}
                  className='text-[0.9rem] inline-block ml-5 text-white'
                >
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
              <div className='relative'>
                <Image
                  src='/assets/notifications-bell.png'
                  alt='notifications bell'
                  width={96}
                  height={96}
                  className='lg:hidden inline ml-4 h-6 w-auto hover:cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNotifications(true);
                  }}
                />
                {notificationBellCounter > 0 && (
                  <div
                    onClick={() => {
                      toggleNotifications();
                    }}
                    className='absolute flex items-center justify-center bottom-[0.5rem] left-[1.6rem] h-[1.1rem] w-[1.1rem] rounded-[50%] bg-bell-counter-red'
                  >
                    <p className='text-white font-semibold text-center text-xs'>
                      {notificationBellCounter}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showNotifications && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className='inline absolute z-40 w-0 h-0 lg:top-[4.2rem] top-[3.5rem] lg:right-[17.8rem] right-[1.28rem] border-l-[1rem] border-l-transparent border-b-[1.5625rem] border-b-black border-r-[1rem] border-r-transparent'></div>
            <div className='container absolute z-50 lg:top-[5.5rem] lg:right-[4rem] lg:w-[48rem] lg:max-h-[37rem] max-h-[35rem] lg:min-h-[13rem] min-h-[calc(100vh-4.1rem)] shadow-lg overflow-y-scroll bg-black lg:rounded-lg lg:py-9 lg:px-7 px-6'>
              <div className='flex flex-column justify-between text-white lg:my-0 my-6'>
                <h1 className='lg:text-[1.7rem] text-[1.1rem]'>
                  {t('Notifications')}
                </h1>
                <p
                  className={`underline lg:text-base text-xs lg:inline block lg:max-w-fit max-w-[6rem] ${
                    notifications &&
                    !notifications.some(
                      (notification: Notification) =>
                        notification.end_user_id === authUserId
                    ) &&
                    'hidden'
                  }`}
                  onClick={handleMarkNotificationsRead}
                >
                  {t('Mark all as read')}
                </p>
              </div>
              <div className='mt-4'>
                {notifications &&
                  notifications.map((notification: Notification) => {
                    if (authUserId === notification.end_user_id) {
                      return (
                        <div
                          key={notification.id}
                          onClick={() => {
                            handleNotificationClicked(
                              notification.id,
                              false,
                              notification.quote_id as number
                            );
                          }}
                          className='text-white hover:cursor-pointer h-[6.3rem] border border-gray-600 lg:rounded-md rounded-sm border-opacity-50 mt-[0.8rem] lg:px-5 px-3'
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
                                  className={`lg:h-[4rem] h-[3.5rem] w-auto mr-6 rounded-[50%] ${
                                    !notification.read &&
                                    'border-2 border-green'
                                  }`}
                                />
                                {!notification.read ? (
                                  <div className='lg:hidden mt-1'>
                                    <p className='text-green text-sm block w-[3.5rem] text-center'>
                                      {t('New')}
                                    </p>
                                  </div>
                                ) : null}
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
                                      {t('Commented to your movie quote')}
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
                                      {t('Reacted to your quote')}
                                    </p>
                                  </div>
                                )}
                                <div className='flex-col lg:hidden'>
                                  <p className='text-input-gray font-light text-sm mt-2'>
                                    {getTimeAgo(notification.created_at)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='flex-col hidden lg:flex'>
                              <p className='text-input-gray font-light text-right'>
                                {getTimeAgo(notification.created_at)}
                              </p>
                              {!notification.read ? (
                                <p className='text-green text-right'>
                                  {t('New')}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return true;
                    }
                  })}
                {notifications &&
                  !notifications.some(
                    (notification: Notification) =>
                      notification.end_user_id === authUserId
                  ) && (
                    <div
                      key='no notifications'
                      className='text-white lg:text-lg pt-4 lg:pb-0 pb-9'
                    >
                      <h1>{t('No notifications')}</h1>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        <div className='hidden lg:flex justify-between items-center py-5 text-base px-16 bg-violet'>
          <p className='uppercase text-cream text-base'>Movie quotes</p>
          <div className='flex items-center'>
            <div className='relative'>
              <Image
                src='/assets/notifications-bell.png'
                alt='notifications bell'
                width={96}
                height={96}
                className='h-[2rem] w-auto mr-7 hover:cursor-pointer'
                onClick={() => {
                  toggleNotifications();
                }}
              />
              {notificationBellCounter > 0 && (
                <div
                  onClick={() => {
                    toggleNotifications();
                  }}
                  className='absolute flex items-center justify-center bottom-[0.7rem] left-[0.8rem] h-[1.5rem] w-[1.5rem] rounded-[50%] bg-bell-counter-red'
                >
                  <p className='text-white font-semibold text-center text-sm'>
                    {notificationBellCounter}
                  </p>
                </div>
              )}
            </div>
            <LangSwitch />
            <button
              onClick={handleLogout}
              className='ml-9 text-white py-[0.5rem] px-6 rounded-md border mr-0 border-white hover:cursor-pointer'
            >
              {t('Log out')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
