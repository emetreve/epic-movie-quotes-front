import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useExpiredWarning = () => {
  const { modalSwitchSetter } = useUiContext();
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation('landing');

  return { modalSwitchSetter, locale, t };
};
export default useExpiredWarning;
