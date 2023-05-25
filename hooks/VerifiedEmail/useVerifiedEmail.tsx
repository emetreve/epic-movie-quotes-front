import { useRouter } from 'next/router';
import { useUiContext } from '@/store';

const useVerifiedEmail = () => {
  const { showVerified, showLog } = useUiContext();

  const router = useRouter();

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showVerified(false);
    }, 500);
  };

  const handleClick = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showVerified(false);
      showLog(true);
    }, 1000);
  };

  return {
    handleClose,
    handleClick,
  };
};
export default useVerifiedEmail;
