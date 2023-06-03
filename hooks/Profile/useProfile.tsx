import { useCheckIfLoggedIn } from '@/hooks';

const useProfile = () => {
  const { logged, user } = useCheckIfLoggedIn();

  return { logged, user };
};

export default useProfile;
