import React, { PropsWithChildren } from 'react';
import * as Style from './style';

export const Paragraph: React.FC<PropsWithChildren> = ({ children }) => {
  return <Style.Paragraph>{children}</Style.Paragraph>;
};
