import { checkCountChar, checkEmoji } from '@/utils/validation';
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
    const text = e.target.value;

    if (text.length <= maxLength) {
      onChange(text);
    }

    if (title === 'nickname' && setError) {
      checkEmoji(text) ? setError(title, '이모지가 포함되면 안 됨') : setError(title, checkCountChar(text));
      return;
    }

    if (setError) {
      setError(title, checkCountChar(text));
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
