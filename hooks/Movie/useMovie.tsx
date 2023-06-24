import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useQuery, useQueryClient } from 'react-query';
import { getMovie, deleteMovie } from '@/services';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';
import { useState } from 'react';
import { usePusher } from '@/hooks';
import { QuoteMessage } from '@/types';

const useMovie = () => {
  const [whichQuoteModalIsOpen, setWhichQuoteModalIsOpen] = useState(null);
  const router = useRouter();
  const { logged, user } = useCheckIfLoggedIn();

  const { locale, push } = useRouter();
  const { id } = router.query;

  const { t } = useTranslation('movies');

  const { showAddQuoteFromMoviesPage, showAddQuoteFromMovies } = useUiContext();

  const queryClient = useQueryClient();

  usePusher();

  useEffect(() => {
    const channelLike = window.Echo.channel('like-updated');
    channelLike.listen('LikeUpdated', function (data: QuoteMessage) {
      if (data) {
        queryClient.invalidateQueries('movie');
      }
    });

    const channelComment = window.Echo.channel('comment-updated');
    channelComment.listen('CommentUpdated', function (data: QuoteMessage) {
      if (data) {
        queryClient.invalidateQueries('movie');
      }
    });

    return () => {
      channelLike.stopListening('LikeUpdated');
      channelComment.stopListening('CommentUpdated');
    };
  }, [user]);

  const fetchMovie = async () => {
    try {
      const response = await getMovie(id as string);
      return response.data;
    } catch {
      router.push('/404');
    }
  };

  const { data: movie } = useQuery('movie', fetchMovie, {
    enabled: !!id,
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteMovie(id);
      push('/dashboard/movies');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    id,
    logged,
    user,
    movie,
    locale,
    showAddQuoteFromMoviesPage,
    showAddQuoteFromMovies,
    whichQuoteModalIsOpen,
    setWhichQuoteModalIsOpen,
    handleDelete,
    t,
  };
};
export default useMovie;
