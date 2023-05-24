import { useState } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/services';
import { useUiContext } from '@/store';

const useLanding = () => {
  const [showLogIn, setShowLogIg] = useState(false);

  const router = useRouter();
  const { id, token, expires, signature } = router.query;

  const { showVerified } = useUiContext();

  const showLog = (show: boolean) => {
    setShowLogIg(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

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

  return {
    showLogIn,
    showLog,
  };
};
export default useLanding;
