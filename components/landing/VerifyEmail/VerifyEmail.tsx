import Image from 'next/image';
import { PropsType } from './types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const VerifyEmail: React.FC<PropsType> = ({ show, showCreateAccount }) => {
  const { t } = useTranslation('landing');
  const { locale } = useRouter();

  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-gradient-violet lg:bg-gradient-plain-violet h-full w-full lg:h-[30rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <Image
          onClick={() => {
            show(false);
          }}
          src='/assets/close-btn.png'
          alt='close button'
          width={200}
          height={200}
          className='hidden lg:block h-5 w-5 lg:h-7 lg:w-7 right-0 absolute mt-7 mr-8 opacity-50 hover:cursor-pointer'
        />
        <div className='rounded-2xl gap-2 flex flex-col items-center justify-center h-[23rem] mt-20 lg:mt-10 bg-gradient-gray mx-8 lg:bg-gradient-plain-violet'>
          <Image
            src='/assets/check-email.png'
            alt='email logo'
            height={500}
            width={500}
            className='inline mr-2 h-14 w-auto'
          />
          <h1 className='text-2xl pt-2 lg:text-[2.1rem] lg:mb-1'>
            {t('Thank you')}
          </h1>
          <p className='mt-3 text-center text-sm lg:text-base lg:mt-6'>
            {t(
              'Please check your email and follow the instructions to activate your account.'
            )}
          </p>
          <button
            onClick={() => {
              show(false);
            }}
            className={`mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-6 ${
              locale === 'en' ? 'lg:px-24' : 'lg:px-7'
            } rounded-md`}
          >
            {t('Back to homepage')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
