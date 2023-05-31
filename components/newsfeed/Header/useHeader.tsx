import { logOut } from '@/services';
import { useCheckIfLoggedIn } from '@/hooks';

const useHeader = () => {
  const { fetch } = useCheckIfLoggedIn();

  const handleLogout = async () => {
    try {
      await logOut();
      fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogout };
};
export default useHeader;
