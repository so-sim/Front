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
