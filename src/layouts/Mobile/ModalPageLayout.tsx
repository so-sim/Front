import useWindowHeight from '@/hooks/@common/useWindowHeight';
import React from 'react';
import MobileHeader from './components/MobileHeader';
import * as Style from './styles';

type Props = {
  left: { icon: JSX.Element; onClick: () => void };
  title: JSX.Element | string;
  children: React.ReactNode;
};

const ModalPageLayout = ({ left, title, children }: Props) => {
  const { windowRef } = useWindowHeight();

  return (
    <Style.Layout ref={windowRef}>
      <MobileHeader left={{ onClick: left.onClick, icon: left.icon }} title={title} />
      <div style={{ padding: '0 16px 32px 16px' }}>{children}</div>
    </Style.Layout>
  );
};

export default ModalPageLayout;
