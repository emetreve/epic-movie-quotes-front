import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { CreateMovieFormData } from '@/types';
import { MovieForSingleMoviePage } from '@/types';

const useEditMovie = (movie: MovieForSingleMoviePage) => {
  const { showMovieEdit } = useUiContext();

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
    reset,
  } = methods;

  const onSubmit = async (data: CreateMovieFormData) => {
    console.log(data);
    //   if (selectedGenres.length < 1) {
    //     setGenreSelectionValid('Please select at least one');
    //     return;
    //   }
    //   if (!imageName) {
    //     setImageError(`${'This field is required'}`);
    //     return;
    //   }
    //   if (selectedFile) {
    //     const formData = new FormData();
    //     formData.append('image', selectedFile, selectedFile.name);
    //     formData.append('genres', JSON.stringify(selectedGenres));
    //     formData.append('nameGe', data.nameGe);
    //     formData.append('nameEn', data.nameEn);
    //     formData.append('year', data.year);
    //     formData.append('directorEn', data.directorEn);
    //     formData.append('directorGe', data.directorGe);
    //     formData.append('descriptionEn', data.descriptionEn);
    //     formData.append('descriptionGe', data.descriptionGe);
    //     formData.append('revenue', data.revenue);
    //     try {
    //       createMovie(formData);
    //       queryClient.invalidateQueries('usermovies').then(() => {
    //         reset();
    //         showAddMovie(false);
    //       });
    //     } catch (error: any) {
    //       console.log(error);
    //     }
    //   }
  };

  return { showMovieEdit, handleSubmit, register, onSubmit, errors };
};
export default useEditMovie;
