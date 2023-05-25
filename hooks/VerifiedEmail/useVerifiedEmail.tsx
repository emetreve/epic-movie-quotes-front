import { useRouter } from 'next/router';
import { useUiContext } from '@/store';

const useVerifiedEmail = () => {
  const { showVerified, showLog } = useUiContext();

  const router = useRouter();

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
    handleClick,
  };
};
export default useVerifiedEmail;
