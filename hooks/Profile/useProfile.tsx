import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';

const useProfile = () => {
  const { logged, user } = useCheckIfLoggedIn();

  const { showEditName, showUpdateName } = useUiContext();

  return { logged, user, showEditName, showUpdateName };
};

export default useProfile;
