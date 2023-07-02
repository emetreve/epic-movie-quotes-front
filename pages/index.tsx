import {
  LandingHeader,
  Poster,
  Footer,
  CreateAccount,
  LogIn,
  VerifyEmail,
  VerifiedEmail,
  ForgotPassword,
  CheckYourEmailPassword,
  CreateNewPassword,
  PasswordChangeSuccess,
  ExpiredWarning,
  ExpiredWarningEmailVerification,
} from '@/components';
import { useLanding } from '@/hooks';
import { useUiContext } from '@/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { checkIfLoggedIn } from '@/services';
import { GetServerSideProps } from 'next';

const Landing: React.FC = () => {
  const { showNotice, t } = useLanding();
  const { showModal, modalSwitchSetter } = useUiContext();

  showNotice();

  return (
    <>
      {showModal === 'showCreateAccount' && <CreateAccount />}

      {showModal === 'showLogIn' && <LogIn />}

      {showModal === 'showCheckEmail' && <VerifyEmail />}

      {showModal === 'showVerifiedEmail' && <VerifiedEmail />}

      {showModal === 'showForgotPassword' && <ForgotPassword />}

      {showModal === 'showCheckYourEmailPassword' && <CheckYourEmailPassword />}

      {showModal === 'showCreateNewPassword' && <CreateNewPassword />}

      {showModal === 'showPasswordChangeSuccess' && <PasswordChangeSuccess />}

      {showModal === 'showExpiredWarning' && <ExpiredWarning />}

      {showModal === 'showExpiredWarningEmailVerification' && (
        <ExpiredWarningEmailVerification />
      )}

      <div className='bg-background h-[40rem] pt-6 lg:h-[52rem]'>
        <LandingHeader />

        <div className='flex flex-col items-center h-[25rem] lg:h-[43rem]'>
          <div className='text-cream lg:leading-[1.4] flex flex-col items-center text-2xl mt-36 font-montserrat lg:text-6xl lg:mt-60'>
            <h1>{t('Find any quote in')}</h1>
            <h1>{t('millions of movie lines')}</h1>
          </div>
          <button
            onClick={() => modalSwitchSetter(true, 'showCreateAccount')}
            className='mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-4 lg:px-5 rounded-md hover:cursor-pointer hover:bg-red-hover'
          >
            {t('Get started')}
          </button>
        </div>
        <main>
          <Poster
            image='/assets/landing-main-1.png'
            alt='Interstellar wallpaper'
            quote={t('You have to leave something behind to go forward')}
            signature={t('Interstellar, 2014')}
            mobileTop='pt-36'
            desktopTop='lg:pt-72'
            priority={true}
          />
          <Poster
            image='/assets/landing-main-2.png'
            alt='The Royal Tenenbaums wallpaper'
            quote={t(
              "I think we're just gonna have to be secretly in love with earch other and leave it that"
            )}
            signature={t('The Royal Tenenbaums, 2001')}
            mobileTop='pt-[8.75rem]'
            desktopTop='lg:pt-[28rem]'
          />
          <Poster
            image='/assets/landing-main-3.png'
            alt='The Lord of the Rings wallpaper'
            quote={t(
              'I see in your eyes the same fear that would take the heart of me....'
            )}
            signature={t('The Lord of the Rings, 2003')}
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

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const asPath = req.url;

  try {
    const response = await checkIfLoggedIn();
    const data = response.data;

    if (!data && asPath && !asPath.includes('scope')) {
      return {
        redirect: {
          destination: '/dashboard/newsfeed',
          permanent: false,
        },
      };
    }
  } catch (error) {}

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['landing'])),
    },
  };
};
