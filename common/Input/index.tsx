import React from 'react';
import * as Style from './styles';

interface InputProps {
  value: string;
  isValid: boolean;
  maxLength: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const Input = ({ onChange, value, isValid, placeholder = '', maxLength = 10 }: InputProps) => {
  const onChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <Style.Input type="text" placeholder={placeholder} isValid={isValid} value={value} onChange={onChangeData} maxLength={maxLength} />
      <Style.Phrase>
        <Style.ErrorText isValid={isValid}>{isValid ? '' : '최소한 1글자 이상 입력해주세요.'}</Style.ErrorText>
        <Style.Length>
          {value.length}/{maxLength}
        </Style.Length>
      </Style.Phrase>
    </>
  );
};
