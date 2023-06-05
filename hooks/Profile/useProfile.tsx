import { useState } from 'react';
import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';

const useProfile = () => {
  const [renewUserData, setRenewUserData] = useState(false);

  const { logged, user } = useCheckIfLoggedIn();

  const { showEditName, showUpdateName } = useUiContext();

  return {
    logged,
    user,
    showEditName,
    showUpdateName,
    renewUserData,
    setRenewUserData,
  };
};

export default useProfile;
