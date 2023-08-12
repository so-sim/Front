import { SYSTEM } from '@/assets/icons/System';
import React from 'react';
import * as Style from './styles';

type Props = {
  left?: JSX.Element;
  title: string;
  children: React.ReactNode;
};

const BottomSheet = ({ left, title, children }: Props) => {
  return (
    <>
      <Style.Frame />
      <Style.BottomSheet>
        <Style.Header>
          {left ? left : <div />}
          <div>{title}</div>
          {SYSTEM.CLOSE_LG}
        </Style.Header>
        <Style.Body>{children}</Style.Body>
      </Style.BottomSheet>
    </>
  );
};

export default BottomSheet;
