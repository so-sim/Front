import { testState } from '@/store/test';
import { ServerResponse } from '@/types/serverResponse';
import { getAccessToken, isErrorCase, removeAccessToken } from '@/utils/acceessToken';
import axios, { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { reTakeToken } from './Auth';
import { notFoundGroupDetail } from './Error';
import { deleteEvent } from './Event';

export const BASE_URL = process.env.REACT_APP_SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (config.url === '/api/event/penalty/73') {
    console.log(config);
  }
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let lock = false;

/**
 * 서버 오류 시 무한 재귀를 대응하기위한 count 변수
 * */
let count = 0;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;

    // const [test, setTest] = useRecoilState(testState);
    // setTest(59);

    count += 1;

    /**
     * 서버 오류 시 무한 재귀를 대응하기위한 if문
     * */
    if (count > 2) {
      count = 0;
      return Promise.reject(error);
    }

    await reTakeToken();

    if (notFoundGroupDetail(error)) {
      return (window.location.href = '/not-found');
    }

    if (response?.data.status.code === 1204) {
      await reTakeToken();

      return api(config);
    }

    return Promise.reject(error);
  },
);

export default api;
