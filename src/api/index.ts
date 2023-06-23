import { getAccessToken } from '@/utils/acceessToken';
import axios from 'axios';
import { reTakeToken } from './Auth';

// export const BASE_URL = 'https://back.sosim-manager.com';
export const BASE_URL = 'https://backdev.sosim-manager.com';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let lock = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (response?.status === 401) {
      if (!lock) {
        lock = true;
        await reTakeToken();
        lock = false;
        return;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
