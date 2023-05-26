export const REDIRECT_URI = {
  SIGNIN: `${process.env.REACT_APP_SERVICE_URL}/auth/signin/kakao`,
  SIGNUP: `${process.env.REACT_APP_SERVICE_URL}/auth/signup/kakao`,
};

export const KAKAO_URL = {
  SIGIN: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI.SIGNIN}&response_type=code`,
  SIGNUP: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI.SIGNUP}&response_type=code`,
};

export const LOGOUT = {
  title: '로그아웃',
  description: '로그아웃 하시겠습니까?',
};
