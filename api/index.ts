import { getAccessToken, removeAccessToken } from '@/utils/acceessToken';
import axios, { AxiosError } from 'axios';
import { reTakeToken } from './Auth';

export const BASE_URL = 'https://back.sosim-manager.com';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (config.headers && accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (response.status === 401) {
      const originalRequest = config;
      removeAccessToken();
      reTakeToken();
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
