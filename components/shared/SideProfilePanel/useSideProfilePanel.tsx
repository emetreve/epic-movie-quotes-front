import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useQuotesContext } from '@/store';

const useSideProfilePanel = () => {
  const { t } = useTranslation(['newsfeed', 'profile']);

  const router = useRouter();

  const asPath = router.asPath;

  const { setQuotesData } = useQuotesContext();

  const handleNavigation = async (route: string) => {
    if (asPath.includes(route)) {
      return;
    }
    if (route === 'newsfeed') {
      setQuotesData([]);
    }
    router.push(`/dashboard/${route}`);
  };

  return { t, handleNavigation, asPath };
};
export default useSideProfilePanel;
