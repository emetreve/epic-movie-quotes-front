import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';

const useCheckYourEmailPassword = () => {
  const router = useRouter();

  const { modalSwitchSetter } = useUiContext();

  const { t } = useTranslation('landing');

  const locale = router.locale;

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showCheckYourEmailPassword');
    }, 500);
  };
  return { handleClose, t, locale };
};
export default useCheckYourEmailPassword;
