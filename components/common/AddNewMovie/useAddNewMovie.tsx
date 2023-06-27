import { useState } from 'react';
import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { getGenres } from '@/services';
import { useQuery, useQueryClient } from 'react-query';
import { Genre } from '@/types';
import { useRouter } from 'next/router';
import { CreateMovieFormData } from '@/types';
import { createMovie } from '@/services';
import { useTranslation } from 'next-i18next';

const useAddNewMovie = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const [genreSelectionValid, setGenreSelectionValid] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState('');
  const [imageError, setImageError] = useState('');

  const { showCreateMovie, showAddMovie } = useUiContext();
  const router = useRouter();
  const locale = router.locale;
  const queryClient = useQueryClient();

  const { t } = useTranslation('movies');

  const fetchGenres = async () => {
    const response = await getGenres();
    return response.data;
  };

  const { data: genres } = useQuery('genres', fetchGenres);

  const methods = useForm({
    defaultValues: {
      nameEn: '',
      nameGe: '',
      year: '',
      directorEn: '',
      directorGe: '',
      descriptionEn: '',
      descriptionGe: '',
      revenue: '',
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

  const handleGenreSelection = (genre: Genre) => {
    const isAlreadySelected = selectedGenres.some(
      (selectedGenre) => selectedGenre.id === genre.id
    );

    if (!isAlreadySelected) {
      setSelectedGenres((prev) => [...prev, genre]);
      setGenreSelectionValid('');
    }

    setShowGenresDropdown(false);
  };

  const handleRemoveGenre = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();

    setSelectedGenres((prevGenres) => {
      const updatedGenres = prevGenres.filter((genre) => genre.id !== id);
      return updatedGenres;
    });

    if (selectedGenres.length === 1) {
      setGenreSelectionValid(`${t('Please select at least one')}`);
    }
  };

  const handleSubmitCheckForGenres = () => {
    if (selectedGenres.length < 1) {
      setGenreSelectionValid(`${t('Please select at least one')}`);
    } else {
      setGenreSelectionValid('');
    }
    if (!imageName) {
      setImageError(`${t('This field is required')}`);
    } else {
      setImageError('');
    }
  };

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

  const onSubmit = async (data: CreateMovieFormData) => {
    if (selectedGenres.length < 1) {
      setGenreSelectionValid(`${t('Please select at least one')}`);
      return;
    }
    if (!imageName) {
      setImageError(`${t('This field is required')}`);
      return;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      formData.append('genres', JSON.stringify(selectedGenres));
      formData.append('year', data.year);
      formData.append('revenue', data.revenue);

      formData.append(
        'name',
        JSON.stringify({
          en: data.nameEn,
          ka: data.nameGe,
        })
      );

      formData.append(
        'director',
        JSON.stringify({
          en: data.directorEn,
          ka: data.directorGe,
        })
      );

      formData.append(
        'description',
        JSON.stringify({
          en: data.descriptionEn,
          ka: data.descriptionGe,
        })
      );

      try {
        createMovie(formData);
        queryClient.invalidateQueries('usermovies').then(() => {
          reset();
          showAddMovie(false);
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return {
    showCreateMovie,
    showAddMovie,
    register,
    errors,
    handleSubmit,
    onSubmit,
    genres,
    selectedGenres,
    locale,
    handleGenreSelection,
    showGenresDropdown,
    setShowGenresDropdown,
    handleRemoveGenre,
    handleSubmitCheckForGenres,
    genreSelectionValid,
    handleUpload,
    handleDrop,
    handleDragOver,
    imageName,
    imageError,
    setImageError,
    t,
  };
};
export default useAddNewMovie;
