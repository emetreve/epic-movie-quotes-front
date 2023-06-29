import { useState } from 'react';
import { useUiContext } from '@/store';
import { useRouter, NextRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CreateQuoteFormData } from '@/types';
import { createQuote } from '@/services';
import { useQueryClient } from 'react-query';

const useAddQuoteFromMovies = (movieId: string) => {
  const [imageName, setImageName] = useState('');
  const [imageError, setImageError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');

  const {
    showAddQuoteFromMoviesPage,
    showMovieDropdown,
    setShowMovieDropdown,
  } = useUiContext();

  const { locale } = useRouter() as NextRouter & { locale: 'en' | 'ka' };

  const { t } = useTranslation('profile');
  const { t: translate } = useTranslation('newsfeed');
  const queryClient = useQueryClient();

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
      formData.append('movie_id', movieId);

      try {
        await createQuote(formData);
        queryClient.invalidateQueries('movie');
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
    handleMovieExistence,
    handleDrop,
    handleDragOver,
    imageError,
    t,
    translate,
  };
};
export default useAddQuoteFromMovies;
