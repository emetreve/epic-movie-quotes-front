import { useRouter } from 'next/router';
import { axiosInstance } from '@/services';
import { useUiContext } from '@/store';

const useLanding = () => {
  const router = useRouter();
  const { id, token, expires, signature } = router.query;

  const { showVerified } = useUiContext();

  const verifyEmail = () => {
    if (id && token && expires && signature) {
      axiosInstance
        .get(
          `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`
        )
        .then((response) => {
          if (response.status === 200) {
            showVerified(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return {
    verifyEmail,
  };
};
export default useLanding;
