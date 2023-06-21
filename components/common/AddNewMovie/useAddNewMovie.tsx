import { useEffect, useState } from 'react';
import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { getGenres } from '@/services';
import { useQuery } from 'react-query';
import { Genre } from '@/types';
import { useRouter } from 'next/router';

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
    if (!imageName) {
      setImageError(`${'This field is required'}`);
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

  const onSubmit = (data) => {
    if (selectedGenres.length < 1) {
      setGenreSelectionValid('Please select at least one');
      return;
    }
    if (!imageName) {
      setImageError(`${'This field is required'}`);
      return;
    }
    console.log(data);
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
  };
};
export default useAddNewMovie;
