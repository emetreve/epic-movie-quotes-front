import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify } from '@/services';

const useLanding = () => {
  const router = useRouter();
  const { id, token, expires, signature, email } = router.query;

  const { showVerified, showCheckEmailPassword } = useUiContext();

  const verifyEmail = async () => {
    if (id && token && expires && signature) {
      const path = `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`;

      try {
        await verify(path);
        showVerified(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkEmailPassword = () => {
    if (token && email) {
      showCheckEmailPassword(true);
    }
  };

  return {
    verifyEmail,
    checkEmailPassword,
  };
};
export default useLanding;
