import React, { PropsWithChildren } from 'react';
import * as Style from './styles';

export const Paragraph: React.FC<PropsWithChildren> = ({ children }) => {
  return <Style.Paragraph>{children}</Style.Paragraph>;
};
