import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify, authenticateAppInstance } from '@/services';
import { useCheckIfLoggedIn } from '@/hooks';
import { axiosInstance } from '@/services';

const useLanding = () => {
  const router = useRouter();
  const {
    id,
    token,
    expires,
    signature,
    email,
    state,
    code,
    scope,
    authuser,
    hd,
    prompt,
  } = router.query;

  const {
    showVerified,
    showSetNewPassword,
    showLog,
    showExpiredEmailVerification,
  } = useUiContext();

  const { logged } = useCheckIfLoggedIn();

  useEffect(() => {
    if (scope) {
      axiosInstance
        .get(
          `/auth/callback/?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&hd=${hd}&prompt=${prompt}`
        )
        .then((res) => {
          window.location.reload();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [scope]);

  useEffect(() => {
    const authenticateApp = async () => {
      try {
        const response = await authenticateAppInstance.get(
          '/sanctum/csrf-cookie'
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    authenticateApp();
  }, []);

  const showNotice = async () => {
    if (id && token && expires && signature) {
      const path = `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`;

      try {
        await verify(path);
        showVerified(true);
      } catch (error: any) {
        console.log(error);
        if (error.response.data?.token_expired) {
          // TODO: show token expired notice
          showExpiredEmailVerification(true);
          console.log('expired');
        }
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
    logged,
  };
};
export default useLanding;
