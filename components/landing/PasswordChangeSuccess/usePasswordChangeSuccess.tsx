import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';

const usePasswordChangeSuccess = () => {
  const { modalSwitchSetter } = useUiContext();

  const router = useRouter();
  const { t } = useTranslation('landing');

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showCreateNewPassword');
      modalSwitchSetter(false, 'showPasswordChangeSuccess');
    }, 500);
  };

  const handleClick = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showPasswordChangeSuccess');
      modalSwitchSetter(false, 'showCreateNewPassword');
      modalSwitchSetter(true, 'showLogIn');
    }, 500);
  };

  return {
    handleClose,
    handleClick,
    t,
  };
};
export default usePasswordChangeSuccess;
