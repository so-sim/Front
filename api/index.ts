import axios from 'axios';

export const BASE_URL = 'https://back.sosim-manager.com';

export const setAccesToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};
export const removeAccessToken = () => {
  return localStorage.removeItem('accessToken');
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default api;
