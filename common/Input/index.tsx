import React, { Dispatch, FC, SetStateAction } from 'react';
import * as Style from './styles';

interface InputProps<T, K extends keyof T> {
  value: T;
  type: K;
  isValid: boolean;
  maxLength: number;
  onChange: (value: T) => void;
}

export const Input = <T, K extends keyof T>({ onChange, value, type, isValid, maxLength = 10 }: InputProps<T, K>) => {
  const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, [type]: e.target.value });
  };

  return (
    <>
      <Style.Input type="text" isValid={isValid} value={value[type] as string} onChange={onChangeData} maxLength={maxLength} />
      <Style.Phrase>
        <Style.ErrorText isValid={isValid}>{isValid ? '' : '최소한 1글자 이상 입력해주세요.'}</Style.ErrorText>
        <Style.Length>
          {(value[type] as string).length}/{maxLength}
        </Style.Length>
      </Style.Phrase>
    </>
  );
};
