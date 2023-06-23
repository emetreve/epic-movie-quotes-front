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
  showSetNewPassword: (show: boolean) => {},
  showCreateNewPassword: false,
  showPasswordSuccess: (show: boolean) => {},
  showPasswordChangeSuccess: false,
  showExpired: (show: boolean) => {},
  showExpiredWarning: false,
  showExpiredEmailVerification: (show: boolean) => {},
  showExpiredWarningEmailVerification: false,
  showEditName: false,
  showUpdateName: (show: boolean) => {},
  showEditPassword: false,
  showUpdatePassword: (show: boolean) => {},
  showBrugerMenu: false,
  showBurger: (show: boolean) => {},
  showSearchMobile: false,
  showSearchMob: (show: boolean) => {},
  showAddNewQuote: false,
  showAddQuote: (show: boolean) => {},
  showMovieDropdown: false,
  setShowMovieDropdown: (newValue: boolean) => {},
  showCreateMovie: false,
  showAddMovie: (show: boolean) => {},
  showAddQuoteFromMovies: false,
  showAddQuoteFromMoviesPage: (show: boolean) => {},
});

export const UiContextProvider: React.FC<PropsType> = ({ children }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogIn, setShowLogIg] = useState(false);
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const [showVerifiedEmail, setShowVerifiedEmail] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showCheckYourEmailPassword, setShowCheckYourEmailPassword] =
    useState(false);
  const [showCreateNewPassword, setCreateNewPassword] = useState(false);
  const [showPasswordChangeSuccess, setShowPasswordChangeSuccess] =
    useState(false);
  const [showExpiredWarning, setShowExpiredWarning] = useState(false);
  const [
    showExpiredWarningEmailVerification,
    setShowExpiredWarningEmailVerification,
  ] = useState(false);

  const [showEditName, setShowEditName] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showBrugerMenu, setShowBurgerMenu] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [showAddNewQuote, setShowAddNewQuote] = useState(false);
  const [showMovieDropdown, setShowMovieDropdown] = useState(false);

  const [showCreateMovie, setShowCreateMovie] = useState(false);
  const [showAddQuoteFromMovies, setShowAddQuoteFromMovies] = useState(false);

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

  const showSetNewPassword = (show: boolean) => {
    setCreateNewPassword(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showPasswordSuccess = (show: boolean) => {
    showSetNewPassword(false);
    setShowPasswordChangeSuccess(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showExpired = (show: boolean) => {
    setShowExpiredWarning(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showExpiredEmailVerification = (show: boolean) => {
    setShowExpiredWarningEmailVerification(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showUpdateName = (show: boolean) => {
    setShowEditName(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showUpdatePassword = (show: boolean) => {
    setShowEditPassword(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showBurger = (show: boolean) => {
    setShowBurgerMenu(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showSearchMob = (show: boolean) => {
    setShowSearchMobile(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showAddQuote = (show: boolean) => {
    setShowAddNewQuote(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const showAddMovie = (show: boolean) => {
    setShowCreateMovie(show);
    const moviesPage = document.getElementById('movies');
    if (moviesPage) {
      show
        ? moviesPage.classList.add('screenHeight')
        : moviesPage.classList.remove('screenHeight');
    }
  };

  const showAddQuoteFromMoviesPage = (show: boolean) => {
    setShowAddQuoteFromMovies(show);
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
        showSetNewPassword,
        showCreateNewPassword,
        showPasswordSuccess,
        showPasswordChangeSuccess,
        showExpiredWarning,
        showExpired,
        showExpiredWarningEmailVerification,
        showExpiredEmailVerification,
        showEditName,
        showUpdateName,
        showUpdatePassword,
        showEditPassword,
        showBrugerMenu,
        showBurger,
        showSearchMobile,
        showSearchMob,
        showAddQuote,
        showAddNewQuote,
        showMovieDropdown,
        setShowMovieDropdown,
        showCreateMovie,
        showAddMovie,
        showAddQuoteFromMovies,
        showAddQuoteFromMoviesPage,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
