import { useState } from 'react';

const useLanding = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogIn, setShowLogIg] = useState(false);

  const showCreate = (show: boolean) => {
    setShowCreateAccount(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showLog = (show: boolean) => {
    setShowLogIg(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };
  return { showCreateAccount, showLogIn, showCreate, showLog };
};
export default useLanding;
