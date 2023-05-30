import axios from 'axios';

const googleAuthInstance = axios.get(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/redirect`
);

export default googleAuthInstance;
