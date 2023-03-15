import { getAccessToken } from '@/queries/Auth/useSignInMutation';
import axios from 'axios';

export const BASE_URL = 'http://localhost:3090';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default api;
