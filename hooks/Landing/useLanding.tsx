import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify } from '@/services';

const useLanding = () => {
  const router = useRouter();
  const { id, token, expires, signature, email } = router.query;

  const { showVerified, showCheckEmailPassword } = useUiContext();

  const showNotice = async () => {
    if (id && token && expires && signature) {
      const path = `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`;

      try {
        await verify(path);
        showVerified(true);
      } catch (error) {
        console.log(error);
      }
    } else if (token && email) {
      setTimeout(() => {
        showCheckEmailPassword(true);
      }, 500);
    }
  };

  return {
    showNotice,
  };
};
export default useLanding;
