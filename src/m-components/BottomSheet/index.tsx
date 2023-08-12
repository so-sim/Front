import { SYSTEM } from '@/assets/icons/System';
import React from 'react';
import * as Style from './styles';

type Props = {
  left?: { icon: JSX.Element; onClick: () => void };
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const BottomSheet = ({ left, title, children, onClose }: Props) => {
  return (
    <>
      <Style.Frame onClick={onClose} />
      <Style.BottomSheet>
        <Style.Header>
          {left ? <div onClick={left.onClick}>{left.icon}</div> : <div />}
          <div>{title}</div>
          <div onClick={onClose}>{SYSTEM.CLOSE_LG}</div>
        </Style.Header>
        <Style.Body>{children}</Style.Body>
      </Style.BottomSheet>
    </>
  );
};

export default BottomSheet;
