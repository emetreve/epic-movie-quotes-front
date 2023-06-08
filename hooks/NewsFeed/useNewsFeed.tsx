import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';

const useNewsFeed = () => {
  const { logged, user } = useCheckIfLoggedIn();

  const { t } = useTranslation('newsfeed');

  return { logged, user, t };
};

export default useNewsFeed;
