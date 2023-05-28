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
      router.push('/');
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { logged };
};

export default useCheckIfLoggedIn;
