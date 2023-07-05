import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import {
  verifyEmail as verify,
  authenticateApp,
  checkIfLoggedIn,
} from '@/services';
import { googleAuth } from '@/services';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';

const useLanding = () => {
  const [showGoogleAuthIsForbidden, setShowGoogleAuthIsForbidden] =
    useState(false);

  const router = useRouter();
  const { id, token, expires, signature, email, scope, oautherror } =
    router.query;

  const { modalSwitchSetter } = useUiContext();

  const { t } = useTranslation('landing');

  const authenticate = async (googleAuthPath: string) => {
    if (scope) {
      try {
        await googleAuth(googleAuthPath);
      } catch (error) {
        window.location.href = `${process.env.NEXT_PUBLIC_SPA_BASE_URL}?oautherror=regularuser`;
      }
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
    onSuccess: async () => {
      try {
        checkIfLoggedIn();
        router.push('/dashboard/newsfeed');
      } catch (error) {}
    },
  });

  const showNotice = async () => {
    if (id && token && expires && signature) {
      const path = `/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`;

      try {
        await verify(path);
        modalSwitchSetter(true, 'showVerifiedEmail');
      } catch (error: any) {
        if (error.response?.data?.token_expired) {
          modalSwitchSetter(true, 'showExpiredWarningEmailVerification');
        }
      }
    }

    if (token && email) {
      setTimeout(() => {
        modalSwitchSetter(false, 'showLogIn');
        modalSwitchSetter(true, 'showCreateNewPassword');
      }, 500);
    }
  };

  const googleCheck = async () => {
    try {
      await checkIfLoggedIn();
    } catch (error) {}
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (oautherror === 'regularuser') {
      setShowGoogleAuthIsForbidden(true);

      timeoutId = setTimeout(() => {
        setShowGoogleAuthIsForbidden(false);
        router.push({
          pathname: router.pathname,
          query: {},
        });
        googleCheck();
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [oautherror]);

  return {
    showNotice,
    showGoogleAuthIsForbidden,
    t,
  };
};
export default useLanding;
