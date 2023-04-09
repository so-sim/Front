import React from 'react';
import * as Style from './styles';

interface InputProps {
  value: string;
  maxLength: number;
  placeholder?: string;
  errorText?: string;
  onChange: (value: string) => void;
}

export const Input = ({ onChange, value, placeholder = '', maxLength = 10, errorText = '' }: InputProps) => {
  const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <Style.Input type="text" placeholder={placeholder} isValid={errorText === '' ? true : false} value={value} onChange={onChangeData} maxLength={maxLength} />
      <Style.Phrase>
        <Style.ErrorText>{errorText}</Style.ErrorText>
        <Style.Length>
          {value.length}/{maxLength}
        </Style.Length>
      </Style.Phrase>
    </>
  );
};
