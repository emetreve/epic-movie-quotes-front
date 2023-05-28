import { useCheckIfLoggedIn } from '@/hooks';

const useNewsFeed = () => {
  const { logged } = useCheckIfLoggedIn();

  return { logged };
};

export default useNewsFeed;
