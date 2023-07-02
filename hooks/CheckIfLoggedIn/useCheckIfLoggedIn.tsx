import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkIfLoggedIn } from '@/services';
import { User } from '@/types';
import Cookies from 'js-cookie';

const useCheckIfLoggedIn = () => {
  const [logged, setLogged] = useState(false);
  const initialState = {
    avatar: '',
    created_at: '',
    email: '',
    email_verified_at: '',
    id: 0,
    is_google_user: 0,
    name: '',
    updated_at: '',
  };
  const [user, setUser] = useState<User>(initialState);
  const router = useRouter();
  const { status } = router.query;

  const fetch = async () => {
    try {
      const response = await checkIfLoggedIn();
      setLogged(true);
      setUser(response.data.user);
      Cookies.set('userId', JSON.stringify(response.data.user.id));
    } catch (error) {
      setLogged(false);
      Cookies.remove('userId');

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
  }, [status]);

  return { logged, setLogged, fetch, user };
};

export default useCheckIfLoggedIn;
