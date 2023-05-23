import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setterToken] = useState('');

  useEffect(() => {
    setterToken(localStorage.getItem('AUTH_TOKEN'));
  }, []);

  const setToken = (token) => {
    setterToken(token);
    if (token) {
      localStorage.setItem('AUTH_TOKEN', token);
    } else {
      localStorage.removeItem('AUTH_TOKEN');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
