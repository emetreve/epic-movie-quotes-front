import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify } from '@/services';

const useLanding = () => {
  const router = useRouter();
  const { id, token, expires, signature, email } = router.query;

  const { showVerified, showSetNewPassword, showLog } = useUiContext();

  const showNotice = async () => {
    if (id && token && expires && signature) {
      const path = `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`;

      try {
        await verify(path);
        showVerified(true);
      } catch (error) {
        console.log(error);
        //TODO: handle expired_token case
      }
    }

    if (token && email) {
      setTimeout(() => {
        showLog(false);
        showSetNewPassword(true);
      }, 500);
    }
  };

  return {
    showNotice,
  };
};
export default useLanding;
