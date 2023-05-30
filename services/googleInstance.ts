import axios from 'axios';

const googleInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/redirect`,
});

export default googleInstance;
