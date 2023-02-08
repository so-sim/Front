import React, { PropsWithChildren } from 'react';
import * as Style from './style';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Style.Layout>{children}</Style.Layout>;
};
