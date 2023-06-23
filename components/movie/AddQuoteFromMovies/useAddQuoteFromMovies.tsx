import { useState } from 'react';
import { useUiContext } from '@/store';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CreateQuoteFormData } from '@/types';
import { createQuote } from '@/services';
import { useQuotesContext } from '@/store';

const useAddQuoteFromMovies = () => {
  const [movieError, setMovieError] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageError, setImageError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');

  const {
    showAddQuoteFromMoviesPage,
    showMovieDropdown,
    setShowMovieDropdown,
  } = useUiContext();
  const router = useRouter();
  const locale = router.locale;
  const { t } = useTranslation('profile');
  const { t: translate } = useTranslation('newsfeed');

  const { quotesData, setQuotesData } = useQuotesContext();

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
    if (!imageName) {
      setImageError(`${t('This field is required')}`);
      return;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      formData.append('bodyGe', data.bodyGe);
      formData.append('bodyEn', data.bodyEn);
      formData.append('user_id', userId);
      // TODO: append movie id

      try {
        const response = await createQuote(formData);
        setQuotesData([response.data, ...quotesData]);
      } catch (error: any) {
        console.log(error);
      }
    }
    reset();
    showAddQuoteFromMoviesPage(false);
  };

  return {
    showAddQuoteFromMoviesPage,
    locale,
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
export default useAddQuoteFromMovies;
