import { checkCountChar } from '@/utils/validation';
import React, { useEffect } from 'react';
import * as Style from './styles';

interface InputProps<T = any> {
  value: string;
  maxLength: number;
  placeholder?: string;
  errorText?: string;
  onChange: (value: string) => void;
  setError?: <P extends T>(target: P, message: string) => string;
  title?: string;
}

const Input = ({ onChange, value, placeholder = '', maxLength = 10, errorText = '', setError, title }: InputProps) => {
  const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      onChange(e.target.value);
    }
    if (setError) {
      setError(title, checkCountChar(e.target.value));
    }
  };

  return (
    <>
      <Style.Input
        type="text" //
        placeholder={placeholder}
        isValid={errorText === ''}
        value={value}
        onChange={onChangeData}
        maxLength={maxLength}
      />
      <Style.Phrase>
        <Style.ErrorText>{errorText}</Style.ErrorText>
        <Style.Length>
          {value.length}/{maxLength}
        </Style.Length>
      </Style.Phrase>
    </>
  );
};
export default Input;
