import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';

const useVerifiedEmail = () => {
  const { modalSwitchSetter } = useUiContext();

  const router = useRouter();

  const { t } = useTranslation('landing');
  const { locale } = router;

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showVerifiedEmail');
    }, 500);
  };

  const handleClick = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showVerifiedEmail');
      modalSwitchSetter(true, 'showLogIn');
    }, 1000);
  };

  return {
    handleClose,
    handleClick,
    t,
    locale,
  };
};
export default useVerifiedEmail;
