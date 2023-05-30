import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify, authenticateAppInstance } from '@/services';
import { useCheckIfLoggedIn } from '@/hooks';
import { googleAuth } from '@/services';

const useLanding = () => {
  const router = useRouter();
  const { id, token, expires, signature, email, scope } = router.query;

  const {
    showVerified,
    showSetNewPassword,
    showLog,
    showExpiredEmailVerification,
  } = useUiContext();

  const { logged, setLogged } = useCheckIfLoggedIn();

  useEffect(() => {
    const authenticate = async () => {
      if (scope) {
        const googleAuthPath = router.asPath;

        const response = await googleAuth(googleAuthPath);

        if (response.data.message === 'User is not a Google user') {
          router.push('/403');
          return;
        } else {
          setLogged(true);
        }
      }
    };
    authenticate();
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
