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

      router.push({
        pathname: '/',
        search: `?${router.asPath.split('?')[1]}`,
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { logged, setLogged };
};

export default useCheckIfLoggedIn;
