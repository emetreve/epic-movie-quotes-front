import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { verifyEmail as verify, authenticateApp } from '@/services';
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

  const { t } = useTranslation('landing');

  const authenticate = async (googleAuthPath: string) => {
    if (scope) {
      try {
        await googleAuth(googleAuthPath);
      } catch (error) {}
    }
    return false;
  };

  const fetchCsrfCookie = async () => {
    const response = await authenticateApp();
    return response;
  };
  useQuery('csrfCookie', fetchCsrfCookie);

  useQuery(['authenticate', router.asPath], () => authenticate(router.asPath), {
    enabled: !!scope,
    onError: () => {
      router.push('/403');
    },
    onSuccess: () => {
      router.push('/dashboard/newsfeed');
    },
  });

  const showNotice = async () => {
    if (id && token && expires && signature) {
      const path = `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`;

      try {
        await verify(path);
        showVerified(true);
      } catch (error: any) {
        if (error.response?.data?.token_expired) {
          showExpiredEmailVerification(true);
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
    t,
  };
};
export default useLanding;
