import React from 'react';
import MobileHeader from './components/MobileHeader';
import * as Style from './styles';

type Props = {
  children: React.ReactNode;
};

const MobileLayout = ({ children }: Props) => {
  return (
    <Style.Layout>
      <MobileHeader />
      {children}
    </Style.Layout>
  );
};

export default MobileLayout;
