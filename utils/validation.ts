export const isValid = (text: string, min: number = 1, max: number = 15): boolean => {
  if (text.trim().length === 0) return false;
  const regExp = new RegExp(`^[a-zA-Zㄱ-ㅎ가-힣]{${min},${max}}$`);
  return regExp.test(text);
};
