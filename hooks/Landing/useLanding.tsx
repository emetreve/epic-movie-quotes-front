import { useState } from 'react';

const useLanding = () => {
  const [showLogIn, setShowLogIg] = useState(false);

  const showLog = (show: boolean) => {
    setShowLogIg(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  return {
    showLogIn,
    showLog,
  };
};
export default useLanding;
