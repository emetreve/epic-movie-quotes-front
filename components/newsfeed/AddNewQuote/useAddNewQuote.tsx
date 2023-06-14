import { useState } from 'react';
import { useUiContext } from '@/store';
import { getMovies } from '@/services';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

const useAddNewQuote = () => {
  const [selectedMovie, setSelectedMovie] = useState({
    name: {
      en: '',
      ka: '',
    },
    id: '',
  });
  const [imageName, setImageName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { showAddQuote, showMovieDropdown, setShowMovieDropdown } =
    useUiContext();
  const router = useRouter();
  const locale = router.locale;
  const { t } = useTranslation('profile');

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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    if (selectedFile) {
      setImageName(selectedFile.name);
    }
  };

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

  const onSubmit = async (data) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      //   try {
      //     await updateAvatar(formData);
      //     router.push({
      //       pathname: router.pathname,
      //       query: { status: 'successful' },
      //     });
      //     setAvatarButtonTrigger(false);
      //   } catch (error: any) {
      //     console.log(error);
      //   }
    }
    console.log(555, data);
    reset();
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
    t,
  };
};
export default useAddNewQuote;
