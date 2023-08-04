import React from 'react';
import * as Style from './styles';

type Props = {
  children: React.ReactNode;
};

const MobileLayout = ({ children }: Props) => {
  return <Style.Layout>{children}</Style.Layout>;
};

export default MobileLayout;
