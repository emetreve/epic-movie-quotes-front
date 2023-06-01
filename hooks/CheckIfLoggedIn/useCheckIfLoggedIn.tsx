import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkIfLoggedIn } from '@/services';

const useCheckIfLoggedIn = () => {
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  const fetch = async () => {
    try {
      await checkIfLoggedIn();
      setLogged(true);
    } catch (error) {
      console.log(error);
      setLogged(false);

      const query = router.asPath.includes('?')
        ? `?${router.asPath.split('?')[1]}`
        : '';
      router.push({
        pathname: '/',
        search: query,
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { logged, setLogged, fetch };
};

export default useCheckIfLoggedIn;
