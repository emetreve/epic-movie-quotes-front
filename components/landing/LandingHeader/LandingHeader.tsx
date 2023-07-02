import { LangSwitch } from '@/components';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';

const LandingHeader = () => {
  const { t } = useTranslation('landing');
  const { modalSwitchSetter } = useUiContext();

  return (
    <div className='flex justify-between items-center text-xs lg:text-base px-5 lg:px-16 '>
      <p className='uppercase text-cream text-md lg:text-base'>Movie quotes</p>
      <div className='flex items-center'>
        <div className='hidden lg:inline'>
          <LangSwitch />
        </div>
        <button
          onClick={() => modalSwitchSetter(true, 'showCreateAccount')}
          className='text-white bg-red py-2 lg:py-[0.5rem] px-4 lg:px-8 rounded-md lg:mr-5 lg:ml-10 order-2 lg:order-1 hover:bg-red-hover'
        >
          {t('Sign Up')}
        </button>
        <button
          onClick={() => modalSwitchSetter(true, 'showLogIn')}
          className='text-white py-2 lg:py-[0.5rem] px-4 lg:px-8 rounded-md border mr-2 lg:mr-0 border-white order-1 lg:order-2'
        >
          {t('Log in')}
        </button>
      </div>
    </div>
  );
};
export default LandingHeader;
