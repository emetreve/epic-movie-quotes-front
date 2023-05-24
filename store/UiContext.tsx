import { createContext, useContext, useState } from 'react';
import { PropsType } from './types';

const UiContext = createContext({
  showCheck: (show: boolean) => {},
  showCheckEmail: false,
});

export const UiContextProvider: React.FC<PropsType> = ({ children }) => {
  const [showCheckEmail, setShowCheckEmail] = useState(false);

  const showCheck = (show: boolean) => {
    setShowCheckEmail(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  return (
    <UiContext.Provider value={{ showCheck, showCheckEmail }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
