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

  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

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
