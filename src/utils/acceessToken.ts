export const setAccesToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('recoil-persist');
  return;
};
export const isErrorCase = (code?: number) => {
  const errorCodes = [
    1200, // 요청 헤더에 리프레시 토큰이 존재하지 않는 경우
    1201, // 리프레시 토큰이 변조된 경우
    1202, // DB에 리프레시 토큰이 존재하지 않는 경우
    1203, // 엑세스 토큰이 변조된 경우
    1205, // 엑세스 토큰이 헤더에 없는 경우
  ];
  return errorCodes.includes(code as number);
};
