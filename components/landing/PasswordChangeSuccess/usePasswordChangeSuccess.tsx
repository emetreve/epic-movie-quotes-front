import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';

const usePasswordChangeSuccess = () => {
  const { showPasswordSuccess, showLog, showSetNewPassword } = useUiContext();

  const router = useRouter();
  const { t } = useTranslation('landing');

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showSetNewPassword(false);
      showPasswordSuccess(false);
    }, 500);
  };

  const handleClick = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showPasswordSuccess(false);
      showSetNewPassword(false);
      showLog(true);
    }, 500);
  };

  return {
    handleClose,
    handleClick,
    t,
  };
};
export default usePasswordChangeSuccess;
