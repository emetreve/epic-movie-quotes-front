import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';

const useVerifiedEmail = () => {
  const { showVerified, showLog } = useUiContext();

  const router = useRouter();

  const { t } = useTranslation('landing');
  const { locale } = router;

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showVerified(false);
    }, 500);
  };

  const handleClick = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showVerified(false);
      showLog(true);
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
