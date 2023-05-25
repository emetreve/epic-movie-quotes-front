import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify } from '@/services';

const useLanding = () => {
  const router = useRouter();
  const { id, token, expires, signature } = router.query;

  const { showVerified } = useUiContext();

  const showNotice = async () => {
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

  return {
    showNotice,
  };
};
export default useLanding;
