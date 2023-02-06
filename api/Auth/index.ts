import api from '..';

export const kakaoLogin = (code: string) => {
  return api.get(`/auth/kakao/callback?code=${code}`);
};
