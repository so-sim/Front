import { FC, PropsWithChildren } from 'react';
import * as Style from './style';

interface CardProps extends PropsWithChildren {
  onClick: () => void;
}

export const Card: FC<CardProps> = ({ children, onClick }) => {
  return <Style.Card onClick={onClick}>{children}</Style.Card>;
};
