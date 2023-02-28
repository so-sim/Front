export const isValid = (text: string, min: number = 2, max: number = 10): boolean => {
  const regExp = new RegExp(`^[a-zA-Z가-힣]{${min},${max}}$`);
  return regExp.test(text);
};
