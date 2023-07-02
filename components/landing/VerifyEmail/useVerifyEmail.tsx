import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';

const useVerifyEmail = () => {
  const { locale } = useRouter();
  const { t } = useTranslation('landing');
  const { modalSwitchSetter } = useUiContext();

  return { locale, t, modalSwitchSetter };
};
export default useVerifyEmail;
