import React from 'react';
import * as Style from './styles';

type Props = {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const MobileLabel = ({ title, children, onClick }: Props) => {
  return (
    <Style.Label onClick={onClick}>
      <span>{title}</span>
      {children}
    </Style.Label>
  );
};

export default MobileLabel;
