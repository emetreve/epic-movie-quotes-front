import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';

const useHeader = () => {
  const { t } = useTranslation('newsfeed');

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogout, t };
};
export default useHeader;
