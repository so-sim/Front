import { getAccessToken } from '@/utils/acceessToken';
import axios from 'axios';
import { reTakeToken } from './Auth';

export const BASE_URL = 'https://back.sosim-manager.com';

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
let subscribers: ((token: string) => void)[] = [];

const addRefreshSubscriber = (callback: (token: string) => void) => {
  subscribers.push(callback);
};

const onRefreshed = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (response.status === 401) {
      const originalRequest = config;

      if (!lock) {
        lock = true;
        await reTakeToken();
        const accessToken = getAccessToken();
        // if (accessToken) {
        // originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        // console.log(originalRequest);
        // api(originalRequest);
        // onRefreshed(accessToken);
        lock = false;
        return;
        // }
      }

      // const reTry = new Promise((resolve) => {
      //   addRefreshSubscriber((token: string) => {
      //     originalRequest.headers['Authorization'] = `Bearer ${token}`;
      //     resolve(api(originalRequest));
      //   });
      // });

      // return reTry;
    }
    return Promise.reject(error);
  },
);

export default api;
