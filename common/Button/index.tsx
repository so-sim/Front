import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import * as Style from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactElement;
  onClick?: () => void;
  width?: string;
  height?: string;
  color?: 'primary' | 'black' | 'white' | 'disabled';
}

const Button: FC<ButtonProps> = ({ children, width = '60px', height = '36px', onClick, color = 'primary' }) => {
  return (
    <Style.Button width={width} height={height} color={color} onClick={onClick} disabled={color === 'disabled'}>
      {children}
    </Style.Button>
  );
};

export default Button;
