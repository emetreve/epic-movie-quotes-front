import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useSideProfilePanel = () => {
  const { t } = useTranslation(['newsfeed', 'profile']);

  const router = useRouter();
  const handleNavigation = async (route: string) => {
    if (route === 'newsfeed') {
      await router.push(`/dashboard/${route}`);
      router.reload();
      return;
    }
    router.push(`/dashboard/${route}`);
  };

  return { t, handleNavigation };
};
export default useSideProfilePanel;
