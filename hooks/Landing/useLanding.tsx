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

        try {
          await googleAuth(googleAuthPath);
          setLogged(true);
        } catch (error) {
          router.push('/403');
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

  useEffect(() => {
    if (token) {
      const persistedLocaleFromEmails = localStorage.getItem('locale');
      if (persistedLocaleFromEmails) {
        router.push('/', '/', {
          locale: persistedLocaleFromEmails,
        });
      }
    }
  }, [token]);

  const showNotice = async () => {
    if (id && token && expires && signature) {
      const path = `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`;

      try {
        await verify(path);
        showVerified(true);
      } catch (error: any) {
        console.log(error);
        if (error.response.data?.token_expired) {
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
