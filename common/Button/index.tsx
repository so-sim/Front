import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import * as Style from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactElement;
  onClick?: () => void;
  width?: string;
  height?: string;
  color?: 'primary' | 'black' | 'white' | 'disabled' | 'white-disabled';
  leftIcon?: JSX.Element;
  id?: string;
}

const Button: FC<ButtonProps> = ({ children, width = '60px', height = '36px', onClick, leftIcon, color = 'primary', id }) => {
  return (
    <Style.Button width={width} height={height} color={color} onClick={onClick} disabled={color.includes('disabled')} id={id}>
      <Style.InnerText>
        {leftIcon && <Style.Icon>{leftIcon}</Style.Icon>}
        {children}
      </Style.InnerText>
    </Style.Button>
  );
};

export default Button;
