import { useCheckIfLoggedIn } from '@/hooks';
import { editUsername } from '@/services';

const useProfile = () => {
  const { logged, user } = useCheckIfLoggedIn();

  const handleChangeName = () => {
    //TODO: send get request on editUsername
  };

  return { logged, user, handleChangeName };
};

export default useProfile;
