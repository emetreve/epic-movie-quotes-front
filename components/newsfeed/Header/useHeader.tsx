import { useRouter } from 'next/router';
import { logOut } from '@/services';

const useHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogout };
};
export default useHeader;
