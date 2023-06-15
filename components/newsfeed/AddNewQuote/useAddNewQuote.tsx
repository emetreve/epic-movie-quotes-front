import { useState } from 'react';
import { useUiContext } from '@/store';
import { getMovies } from '@/services';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CreateQuoteFormData } from '@/types';
import { createQuote } from '@/services';
import { useQueryClient } from 'react-query';

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
  const [imageError, setImageError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');

  const { showAddQuote, showMovieDropdown, setShowMovieDropdown } =
    useUiContext();
  const router = useRouter();
  const locale = router.locale;
  const queryClient = useQueryClient();
  const { t } = useTranslation('profile');
  const { t: translate } = useTranslation('newsfeed');

  const fetchMovies = async () => {
    const response = await getMovies();
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
  } = methods;

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    if (selectedFile) {
      setImageName(selectedFile.name);
      setImageError('');
    }
  };

  const handleMovieExistence = (userId: string) => {
    setUserId(userId);
    if (!selectedMovie.id) {
      setMovieError(`${t('This field is required')}`);
    }
    if (!imageName) {
      setImageError(`${t('This field is required')}`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setSelectedFile(selectedFile);
    setImageName(selectedFile.name);
    setImageError('');
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

    if (!imageName) {
      setImageError(`${t('This field is required')}`);
      return;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      formData.append('bodyGe', data.bodyGe);
      formData.append('bodyEn', data.bodyEn);
      formData.append('movie_id', selectedMovie.id);
      formData.append('user_id', userId);

      try {
        await createQuote(formData);
        queryClient.invalidateQueries('quotes');
      } catch (error: any) {
        console.log(error);
      }
    }
    reset();
    showAddQuote(false);
  };

  return {
    showAddQuote,
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
    imageError,
    t,
    translate,
  };
};
export default useAddNewQuote;
