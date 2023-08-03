import { FC, PropsWithChildren } from 'react';
import * as Style from './styles';

interface CardProps extends PropsWithChildren {
  onClick: () => void;
  size: 'sm' | 'md';
}

export const Card: FC<CardProps> = ({ children, onClick, size }) => {
  return (
    <Style.Card onClick={onClick} size={size}>
      {children}
    </Style.Card>
  );
};
