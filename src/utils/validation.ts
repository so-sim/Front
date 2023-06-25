import { EventInfoTest } from '@/types/event';
import { useState } from 'react';

export const checkCountChar = (text: string, min: number = 1, max: number = 15): string => {
  if (text.trim().length === 0) return '최소 1글자 이상 입력해 주세요.';
  const regExp = new RegExp(`\.{${min},${max}}`);
  const result = regExp.test(text);
  if (!result) {
    return '최소 1글자 이상 입력해 주세요.';
  }
  return '';
};

export const useError = <T extends object>(initialState: T): [T, <P extends keyof T>(target: P, message: string) => string] => {
  const [isError, setIsError] = useState(initialState);

  const setError = <P extends keyof T>(target: P, message: string) => {
    if (!target) {
      setIsError((pre) => ({ ...pre, [target]: '최소 1글자 이상 입력해 주세요.' }));
      return message;
    }
    setIsError((pre) => ({ ...pre, [target]: message }));
    return message;
  };

  return [isError, setError];
};

export const checkFormIsValid = (selectData: Omit<EventInfoTest, 'groupId'>): boolean => {
  const { nickname, amount, situation, date } = selectData;
  if (!nickname || !situation || !amount || !date) return false;

  return true;
};
