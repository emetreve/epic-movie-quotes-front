import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';

const useNewsFeed = () => {
  const { t } = useTranslation('newsfeed');

  const { logged, user } = useCheckIfLoggedIn();

  return { logged, user, t };
};

export default useNewsFeed;
