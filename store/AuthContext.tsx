import { createContext, useContext, useState, useEffect } from 'react';
import { PropsType } from './types';
import { AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider: React.FC<PropsType> = ({ children }) => {
  const [user, setterUser] = useState(null);
  const [token, setterToken] = useState('');

  useEffect(() => {
    setterToken(localStorage.getItem('AUTH_TOKEN') || '');
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      setterToken(token);
      localStorage.setItem('AUTH_TOKEN', token);
    } else {
      localStorage.removeItem('AUTH_TOKEN');
    }
  };

  const setUser = (user: any) => {
    if (user) {
      setterUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
