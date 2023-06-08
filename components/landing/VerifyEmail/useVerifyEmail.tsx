import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const useVerifyEmail = () => {
  const { locale } = useRouter();
  const { t } = useTranslation('landing');

  return { locale, t };
};
export default useVerifyEmail;
