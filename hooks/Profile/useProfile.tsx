import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';
// import { editUsername } from '@/services';

const useProfile = () => {
  const { logged, user } = useCheckIfLoggedIn();

  const { showEditName, showUpdateName } = useUiContext();

  // const handleChangeName = () => {
  //   //TODO: send get request on editUsername
  // };

  return { logged, user, showEditName, showUpdateName };
};

export default useProfile;
