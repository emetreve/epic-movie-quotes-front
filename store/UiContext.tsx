import { createContext, useContext, useState } from 'react';
import { PropsType } from './types';

const UiContext = createContext({
  showCheck: (show: boolean) => {},
  showCreate: (show: boolean) => {},
  showVerified: (show: boolean) => {},
  showLog: (show: boolean) => {},
  showForgot: (show: boolean) => {},
  showCheckEmailPassword: (show: boolean) => {},
  showSetNewPassword: (show: boolean) => {},
  showPasswordSuccess: (show: boolean) => {},
  showExpired: (show: boolean) => {},
  showExpiredEmailVerification: (show: boolean) => {},
  showUpdateName: (show: boolean) => {},
  showUpdatePassword: (show: boolean) => {},
  showBurger: (show: boolean) => {},
  showSearchMob: (show: boolean) => {},
  showAddQuote: (show: boolean) => {},
  showMovieDropdown: false,
  setShowMovieDropdown: (newValue: boolean) => {},
  showCreateMovie: false,
  showAddMovie: (show: boolean) => {},
  showAddQuoteFromMovies: false,
  showAddQuoteFromMoviesPage: (show: boolean) => {},
  showEditMovie: false,
  showMovieEdit: (show: boolean) => {},
  showUpdateEmail: (show: boolean) => {},
  showLangDropdown: false,
  setShowLangDropdown: (newValue: boolean) => {},
  showNotifications: false,
  setShowNotifications: (newValue: boolean) => {},
  showModal: '',
});

export const UiContextProvider: React.FC<PropsType> = ({ children }) => {
  const [showModal, setShowModal] = useState('');

  const [showCreateMovie, setShowCreateMovie] = useState(false);
  const [showAddQuoteFromMovies, setShowAddQuoteFromMovies] = useState(false);
  const [showEditMovie, setShowEditMovie] = useState(false);
  const [showMovieDropdown, setShowMovieDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const showCreate = (show: boolean) => {
    if (show) {
      setShowModal('showCreateAccount');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showLog = (show: boolean) => {
    if (show) {
      setShowModal('showLogIn');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showCheck = (show: boolean) => {
    if (show) {
      setShowModal('showCheckEmail');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showVerified = (show: boolean) => {
    if (show) {
      setShowModal('showVerifiedEmail');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showForgot = (show: boolean) => {
    if (show) {
      setShowModal('showForgotPassword');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showCheckEmailPassword = (show: boolean) => {
    if (show) {
      setShowModal('showCheckYourEmailPassword');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showSetNewPassword = (show: boolean) => {
    if (show) {
      setShowModal('showCreateNewPassword');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showExpired = (show: boolean) => {
    if (show) {
      setShowModal('showExpiredWarning');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showExpiredEmailVerification = (show: boolean) => {
    if (show) {
      setShowModal('showExpiredWarningEmailVerification');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showUpdateName = (show: boolean) => {
    if (show) {
      setShowModal('showEditName');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showUpdatePassword = (show: boolean) => {
    if (show) {
      setShowModal('showEditPassword');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showBurger = (show: boolean) => {
    if (show) {
      setShowModal('showBrugerMenu');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showSearchMob = (show: boolean) => {
    if (show) {
      setShowModal('showSearchMobile');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showAddQuote = (show: boolean) => {
    if (show) {
      setShowModal('showAddNewQuote');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showUpdateEmail = (show: boolean) => {
    if (show) {
      setShowModal('showEditEmail');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
  };

  const showPasswordSuccess = (show: boolean) => {
    if (show) {
      setShowModal('showPasswordChangeSuccess');
      document.body.classList.add('hide-scrollbar');
    } else {
      setShowModal('');
      document.body.classList.remove('hide-scrollbar');
    }
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
    const moviesPage = document.getElementById('movie');
    if (moviesPage) {
      show
        ? moviesPage.classList.add('screenHeight')
        : moviesPage.classList.remove('screenHeight');
    }
  };

  const showMovieEdit = (show: boolean) => {
    setShowEditMovie(show);
    const moviesPage = document.getElementById('movie');
    if (moviesPage) {
      show
        ? moviesPage.classList.add('screenHeight')
        : moviesPage.classList.remove('screenHeight');
    }
  };

  return (
    <UiContext.Provider
      value={{
        showCheck,
        showCreate,
        showLog,
        showVerified,
        showForgot,
        showCheckEmailPassword,
        showSetNewPassword,
        showPasswordSuccess,
        showExpired,
        showExpiredEmailVerification,
        showUpdateName,
        showUpdatePassword,
        showBurger,
        showSearchMob,
        showAddQuote,
        showMovieDropdown,
        setShowMovieDropdown,
        showCreateMovie,
        showAddMovie,
        showAddQuoteFromMovies,
        showAddQuoteFromMoviesPage,
        showEditMovie,
        showMovieEdit,
        showUpdateEmail,
        showLangDropdown,
        setShowLangDropdown,
        showNotifications,
        setShowNotifications,
        showModal,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
