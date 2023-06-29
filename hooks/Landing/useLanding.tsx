import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify, authenticateApp } from '@/services';
import { useCheckIfLoggedIn } from '@/hooks';
import { googleAuth } from '@/services';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';

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

  const { t } = useTranslation('landing');

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

  const fetchCsrfCookie = async () => {
    const response = await authenticateApp();
    return response;
  };
  useQuery('csrfCookie', fetchCsrfCookie);

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
    t,
  };
};
export default useLanding;
