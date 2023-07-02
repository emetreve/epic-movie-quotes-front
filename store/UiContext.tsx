import { createContext, useContext, useState } from 'react';
import { PropsType } from './types';

const UiContext = createContext({
  showMovieDropdown: false,
  setShowMovieDropdown: (newValue: boolean) => {},
  showCreateMovie: false,
  showAddMovie: (show: boolean) => {},
  showAddQuoteFromMovies: false,
  showAddQuoteFromMoviesPage: (show: boolean) => {},
  showEditMovie: false,
  showMovieEdit: (show: boolean) => {},
  showLangDropdown: false,
  setShowLangDropdown: (newValue: boolean) => {},
  showNotifications: false,
  setShowNotifications: (newValue: boolean) => {},
  showModal: '',
  modalSwitchSetter: (show: boolean, name: string) => {},
});

export const UiContextProvider: React.FC<PropsType> = ({ children }) => {
  const [showModal, setShowModal] = useState('');

  const [showCreateMovie, setShowCreateMovie] = useState(false);
  const [showAddQuoteFromMovies, setShowAddQuoteFromMovies] = useState(false);
  const [showEditMovie, setShowEditMovie] = useState(false);
  const [showMovieDropdown, setShowMovieDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const modalSwitchSetter = (show: boolean, name: string) => {
    if (show) {
      setShowModal(name);
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
        showMovieDropdown,
        setShowMovieDropdown,
        showCreateMovie,
        showAddMovie,
        showAddQuoteFromMovies,
        showAddQuoteFromMoviesPage,
        showEditMovie,
        showMovieEdit,
        showLangDropdown,
        setShowLangDropdown,
        showNotifications,
        setShowNotifications,
        showModal,
        modalSwitchSetter,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
