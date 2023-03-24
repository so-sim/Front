export const REDIRECT_URI = {
  SIGNIN: 'http://localhost:3090/auth/signin/kakao',
  SIGNUP: 'http://localhost:3090/auth/signup/kakao',
};

export const KAKAO_URL = {
  SIGIN: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI.SIGNIN}&response_type=code`,
  SIGNUP: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI.SIGNUP}&response_type=code`,
};
