import { useRouter } from 'next/router';
import { useUiContext } from '@/store';

const useCheckYourEmailPassword = () => {
  const router = useRouter();
  const { showCheckEmailPassword } = useUiContext();

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showCheckEmailPassword(false);
    }, 500);
  };
  return { handleClose };
};
export default useCheckYourEmailPassword;
