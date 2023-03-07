export const isValid = (text: string, min: number = 1, max: number = 15): boolean => {
  if (text.trim().length === 0) return false;
  const regExp = new RegExp(`\.{${min},${max}}`);
  return regExp.test(text);
};
