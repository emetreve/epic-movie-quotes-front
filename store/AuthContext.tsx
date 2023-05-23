import { createContext, useContext, useState, useEffect } from 'react';
import { PropsType } from './types';
import { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider: React.FC<PropsType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('AUTH_TOKEN') || '');
  }, []);

  const updateToken = (token: string | null) => {
    if (token) {
      setToken(token);
      localStorage.setItem('AUTH_TOKEN', token);
    } else {
      localStorage.removeItem('AUTH_TOKEN');
    }
  };

  const updateUser = (user: User | null) => {
    if (user) {
      setUser(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser: updateUser, token, setToken: updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
