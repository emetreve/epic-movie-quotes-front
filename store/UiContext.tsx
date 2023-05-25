import { createContext, useContext, useState } from 'react';
import { PropsType } from './types';

const UiContext = createContext({
  showCheck: (show: boolean) => {},
  showCheckEmail: false,
  showCreate: (show: boolean) => {},
  showCreateAccount: false,
  showVerified: (show: boolean) => {},
  showVerifiedEmail: false,
  showLog: (show: boolean) => {},
  showLogIn: false,
  showForgot: (show: boolean) => {},
  showForgotPassword: false,
  showCheckEmailPassword: (show: boolean) => {},
  showCheckYourEmailPassword: false,
});

export const UiContextProvider: React.FC<PropsType> = ({ children }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogIn, setShowLogIg] = useState(false);
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const [showVerifiedEmail, setShowVerifiedEmail] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showCheckYourEmailPassword, setShowCheckYourEmailPassword] =
    useState(false);

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

  const showCheck = (show: boolean) => {
    setShowCheckEmail(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showVerified = (show: boolean) => {
    setShowVerifiedEmail(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showForgot = (show: boolean) => {
    setShowForgotPassword(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showCheckEmailPassword = (show: boolean) => {
    setShowCheckYourEmailPassword(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  return (
    <UiContext.Provider
      value={{
        showCheck,
        showCreate,
        showLog,
        showVerified,
        showForgotPassword,
        showCheckEmail,
        showCreateAccount,
        showVerifiedEmail,
        showLogIn,
        showForgot,
        showCheckEmailPassword,
        showCheckYourEmailPassword,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
