import { useRouter } from 'next/router';

const useMovie = () => {
  const router = useRouter();
  const { id } = router.query;
  return { id };
};
export default useMovie;
