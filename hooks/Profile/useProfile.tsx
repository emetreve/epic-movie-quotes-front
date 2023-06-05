import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';

const useProfile = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);

  const router = useRouter();
  const { status } = router.query;

  const { logged, user } = useCheckIfLoggedIn();

  const { showEditName, showUpdateName, showUpdatePassword, showEditPassword } =
    useUiContext();

  useEffect(() => {
    if (status === 'success') {
      setShowSuccess(true);
    }
    setTimeout(() => {
      setShowSuccess(false);
      router.push({
        pathname: router.pathname,
        query: {},
      });
    }, 4000);
  }, [status]);

  return {
    logged,
    user,
    showEditName,
    showUpdateName,
    showSuccess,
    setShowSuccess,
    showUpdatePassword,
    showEditPassword,
    showUsernameInput,
    setShowUsernameInput,
  };
};

export default useProfile;
