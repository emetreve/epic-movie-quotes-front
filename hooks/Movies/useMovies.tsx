import { useState } from 'react';
import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';
import { getUserMovies } from '@/services';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter, NextRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { SearchMoviesData, MovieForMoviesPage } from '@/types';

const useMovies = () => {
  const [showSearchLg, setShowSearchLg] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchResult, setSearchResult] = useState<MovieForMoviesPage[]>([]);
  const {
    showModal,
    modalSwitchSetter,
    showCreateMovie,
    showAddMovie,
    setShowLangDropdown,
    showLangDropdown,
    showNotifications,
    setShowNotifications,
  } = useUiContext();
  const { logged, user } = useCheckIfLoggedIn();
  const { push } = useRouter();

  const { locale } = useRouter() as NextRouter & { locale: 'en' | 'ka' };
  const { t } = useTranslation('movies');

  const queryClient = useQueryClient();

  const fetchUserMovies = async () => {
    const response = await getUserMovies();
    return response.data;
  };

  const { data: movies, refetch: refetchMovies } = useQuery(
    'usermovies',
    fetchUserMovies
  );

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const searchTracker = useWatch({
    control,
    name: 'search',
  });

  const handleOutsideClick = () => {
    if (showModal === 'showBrugerMenu') {
      modalSwitchSetter(false, 'showBrugerMenu');
    }

    if (showSearchLg) {
      setShowSearchLg(false);
      reset();
    }

    if (showLangDropdown) {
      setShowLangDropdown(!showLangDropdown);
    }

    if (showNotifications) {
      setShowNotifications(!showNotifications);
    }
  };

  const handleBlur = () => {
    setShowSearchLg(false);
    reset();
    setFocused(false);
  };

  const handleMovieListingClick = (id: number) => {
    push(`/dashboard/movies/${id}`);
  };

  const onSubmit = async (data: SearchMoviesData) => {
    setSearchResult([]);
    queryClient.setQueryData('usermovies', []);
    setShowSearchLg(false);
    const response = await getUserMovies(locale as string, data.search);
    setSearchResult(response.data);
    reset();
  };

  return {
    movies,
    locale,
    logged,
    user,
    handleOutsideClick,
    showCreateMovie,
    showAddMovie,
    showSearchLg,
    setShowSearchLg,
    focused,
    setFocused,
    register,
    handleSubmit,
    onSubmit,
    searchTracker,
    searchResult,
    reset,
    handleBlur,
    handleMovieListingClick,
    refetchMovies,
    t,
  };
};

export default useMovies;
