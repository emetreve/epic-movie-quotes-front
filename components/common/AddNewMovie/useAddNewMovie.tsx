import { useState } from 'react';
import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { getGenres } from '@/services';
import { useQuery } from 'react-query';
import { Genre } from '@/types';
import { useRouter } from 'next/router';

const useAddNewMovie = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [showGenresDropdown, setShowGenresDropdown] = useState(false);

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
  };

  const onSubmit = (data) => {
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
  };
};
export default useAddNewMovie;
