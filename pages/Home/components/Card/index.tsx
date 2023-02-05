import { FC, PropsWithChildren } from 'react';
import * as Style from './style';

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return <Style.Card>{children}</Style.Card>;
};
