import { useState } from 'react';
import { useUiContext } from '@/store';
import { getUserMovies } from '@/services';
import { useQuery } from 'react-query';
import { useRouter, NextRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CreateQuoteFormData } from '@/types';
import { createQuote } from '@/services';
import { useQuotesContext } from '@/store';

const useAddNewQuote = () => {
  const [selectedMovie, setSelectedMovie] = useState({
    name: {
      en: '',
      ka: '',
    },
    id: '',
  });
  const [movieError, setMovieError] = useState('');
  const [imageName, setImageName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');

  const { modalSwitchSetter, showMovieDropdown, setShowMovieDropdown } =
    useUiContext();
  const { locale } = useRouter() as NextRouter & { locale: 'en' | 'ka' };
  const { t } = useTranslation('profile');
  const { t: translate } = useTranslation('newsfeed');

  const { quotesData, setQuotesData } = useQuotesContext();

  const fetchMovies = async () => {
    const response = await getUserMovies();
    return response.data;
  };

  const handleMovieChange = (
    id: string,
    name: {
      en: string;
      ka: string;
    }
  ) => {
    setSelectedMovie({
      id,
      name,
    });
    setShowMovieDropdown(false);
  };

  const { data: movies } = useQuery('movies', fetchMovies);

  const methods = useForm({
    defaultValues: {
      bodyEn: '',
      bodyGe: '',
      image: null,
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = methods;

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    if (selectedFile) {
      setImageName(selectedFile.name);
      clearErrors('image');
    }
  };

  const handleMovieExistence = (userId: string) => {
    setUserId(userId);
    if (!selectedMovie.id) {
      setMovieError(`${t('This field is required')}`);
    }
    if (!imageName) {
      setError('image', {
        type: 'manual',
        message: `${t('This field is required')}`,
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setSelectedFile(selectedFile);
    setImageName(selectedFile.name);
    clearErrors('image');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (data: CreateQuoteFormData) => {
    if (!selectedMovie.id) {
      return;
    } else {
      setMovieError('');
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      formData.append('bodyGe', data.bodyGe);
      formData.append('bodyEn', data.bodyEn);
      formData.append('movie_id', selectedMovie.id);
      formData.append('user_id', userId);

      try {
        const response = await createQuote(formData);
        setQuotesData([response.data, ...quotesData]);
      } catch (error: any) {
        if (error?.response?.data?.errors?.image) {
          const errors = error.response?.data?.errors;
          for (const field in errors) {
            if (field === 'image') {
              setError('image', {
                type: 'manual',
                message: `${t('image format error')}`,
              });
            }
          }
        }
        return;
      }
    }
    reset();
    modalSwitchSetter(false, 'showAddNewQuote');
  };

  return {
    modalSwitchSetter,
    movies,
    locale,
    selectedMovie,
    handleMovieChange,
    showMovieDropdown,
    setShowMovieDropdown,
    imageName,
    setImageName,
    handleUpload,
    handleSubmit,
    onSubmit,
    register,
    errors,
    movieError,
    setMovieError,
    handleMovieExistence,
    handleDrop,
    handleDragOver,
    t,
    translate,
  };
};
export default useAddNewQuote;
