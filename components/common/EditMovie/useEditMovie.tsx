import { useState } from 'react';
import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { CreateMovieFormData, Genre } from '@/types';
import { MovieForSingleMoviePage } from '@/types';
import { getGenres, updateMovie } from '@/services';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const useEditMovie = (movie: MovieForSingleMoviePage) => {
  const existingGenres = movie.genres ? [...movie.genres] : [];

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([
    ...existingGenres,
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);
  const [genreSelectionValid, setGenreSelectionValid] = useState('');
  const [imageName, setImageName] = useState('');
  const [uploadedImageToDisplay, setUploadedImageToDisplay] = useState('');

  const { showMovieEdit } = useUiContext();

  const router = useRouter();
  const locale = router.locale;
  const { t } = useTranslation('movies');

  const queryClient = useQueryClient();

  const fetchGenres = async () => {
    const response = await getGenres();
    return response.data;
  };

  const { data: genres } = useQuery('genres', fetchGenres);

  const methods = useForm({
    defaultValues: {
      nameEn: movie.name.en,
      nameGe: movie.name.ka,
      year: movie.year,
      directorEn: movie.director.en,
      directorGe: movie.director.ka,
      descriptionEn: movie.description.en,
      descriptionGe: movie.description.ka,
      revenue: movie.revenue,
      image: null,
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      setGenreSelectionValid('Please select at least one');
    }
  };

  const handleSubmitCheckForGenres = () => {
    if (selectedGenres.length < 1) {
      setGenreSelectionValid('Please select at least one');
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
    }

    const file = selectedFile;
    const reader = new FileReader();

    reader.onload = function (event) {
      const binaryData = event.target?.result;
      setUploadedImageToDisplay(binaryData as string);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setSelectedFile(selectedFile);
    setImageName(selectedFile.name);

    const file = selectedFile;
    const reader = new FileReader();

    reader.onload = function (event) {
      const binaryData = event.target?.result;
      setUploadedImageToDisplay(binaryData as string);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (data: CreateMovieFormData) => {
    console.log(1901020, data);
    if (selectedGenres.length < 1) {
      setGenreSelectionValid('Please select at least one');
      return;
    }
    const formData = new FormData();
    formData.append('genres', JSON.stringify(selectedGenres));
    formData.append('nameGe', data.nameGe);
    formData.append('nameEn', data.nameEn);
    formData.append('year', data.year);
    formData.append('directorEn', data.directorEn);
    formData.append('directorGe', data.directorGe);
    formData.append('descriptionEn', data.descriptionEn);
    formData.append('descriptionGe', data.descriptionGe);
    formData.append('revenue', data.revenue);
    if (selectedFile) {
      formData.append('image', selectedFile, selectedFile.name);
    }

    try {
      updateMovie(formData, movie.id);
      queryClient.invalidateQueries('movie').then(() => {
        showMovieEdit(false);
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    showMovieEdit,
    handleSubmit,
    register,
    onSubmit,
    errors,
    genres,
    selectedGenres,
    handleGenreSelection,
    showGenresDropdown,
    setShowGenresDropdown,
    handleRemoveGenre,
    handleSubmitCheckForGenres,
    genreSelectionValid,
    locale,
    handleUpload,
    handleDrop,
    handleDragOver,
    imageName,
    uploadedImageToDisplay,
    t,
  };
};
export default useEditMovie;
