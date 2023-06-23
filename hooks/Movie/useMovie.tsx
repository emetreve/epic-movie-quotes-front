import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useQuery } from 'react-query';
import { getMovie } from '@/services';

const useMovie = () => {
  const router = useRouter();
  const { logged, user } = useCheckIfLoggedIn();

  const { locale } = useRouter();
  const { id } = router.query;

  const fetchMovie = async () => {
    try {
      const response = await getMovie(id as string);
      return response.data;
    } catch {
      router.push('/404');
    }
  };

  const { data: movie } = useQuery('usermovies', fetchMovie, {
    enabled: !!id,
  });

  return { id, logged, user, movie, locale };
};
export default useMovie;
