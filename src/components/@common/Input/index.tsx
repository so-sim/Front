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
    if (title === 'nickname' && setError) {
      const emojiRegExp = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]+$/;
      const text = e.target.value;

      const result = emojiRegExp.test(text);
      !result && text !== '' ? setError(title, '이모지가 포함되면 안 됨') : setError(title, checkCountChar(text));
      return;
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
