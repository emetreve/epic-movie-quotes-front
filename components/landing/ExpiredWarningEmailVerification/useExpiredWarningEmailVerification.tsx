import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { resendVerifyEmail } from '@/services';

const useExpiredWarningEmailVerification = () => {
  const router = useRouter();
  const { showExpiredEmailVerification, showCheck } = useUiContext();
  const { id } = router.query;

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showExpiredEmailVerification(false);
    }, 500);
  };

  const handleButton = async () => {
    const response = await resendVerifyEmail(id as string);
    if (response.status === 200) {
      router.push({
        pathname: router.pathname,
        query: {},
      });
      setTimeout(() => {
        showExpiredEmailVerification(false);
        showCheck(true);
      }, 500);
    }
  };
  return { handleClose, handleButton };
};

export default useExpiredWarningEmailVerification;
