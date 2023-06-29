import axios from 'axios';

const authenticateAppInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const authenticateApp = async () => {
  await authenticateAppInstance.get('/sanctum/csrf-cookie');
};

export default authenticateApp;
