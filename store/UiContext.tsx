import { createContext, useContext, useState } from 'react';
import { PropsType } from './types';

const UiContext = createContext({
  showCheck: (show: boolean) => {},
  showCheckEmail: false,
  showCreate: (show: boolean) => {},
  showCreateAccount: false,
});

export const UiContextProvider: React.FC<PropsType> = ({ children }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showCheckEmail, setShowCheckEmail] = useState(false);

  const showCreate = (show: boolean) => {
    setShowCreateAccount(show);
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

  return (
    <UiContext.Provider
      value={{ showCheck, showCreate, showCheckEmail, showCreateAccount }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
