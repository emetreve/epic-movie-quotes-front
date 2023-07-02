import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { resendVerifyEmail } from '@/services';
import { useTranslation } from 'next-i18next';

const useExpiredWarningEmailVerification = () => {
  const router = useRouter();
  const { modalSwitchSetter } = useUiContext();
  const { id } = router.query;
  const { t } = useTranslation('landing');
  const { locale } = router;

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showExpiredWarningEmailVerification');
    }, 500);
  };

  const handleButton = async () => {
    const response = await resendVerifyEmail(id as string);
    if (response.status === 200) {
      router.push({
        pathname: router.pathname,
        query: {},
      });
      setTimeout(() => {
        modalSwitchSetter(false, 'showExpiredWarningEmailVerification');
        modalSwitchSetter(true, 'showCheckEmail');
      }, 500);
    }
  };
  return { handleClose, handleButton, locale, t };
};

export default useExpiredWarningEmailVerification;
