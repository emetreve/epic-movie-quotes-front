import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useQuery } from 'react-query';
import { getMovie } from '@/services';

const useMovie = () => {
  const router = useRouter();
  const { logged, user } = useCheckIfLoggedIn();

  const { id } = router.query;

  const fetchMovie = async () => {
    const response = await getMovie(id as string);
    console.log(response.data);
    return response.data;
  };

  const { data: movie } = useQuery('usermovies', fetchMovie, {
    enabled: !!id,
  });

  return { id, logged, user, movie };
};
export default useMovie;
