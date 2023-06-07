import { useCheckIfLoggedIn } from '@/hooks';

const useNewsFeed = () => {
  const { logged, user } = useCheckIfLoggedIn();

  return { logged, user };
};

export default useNewsFeed;
