import React from 'react';
import * as Style from './styles';

type Props = {
  size?: 'sm' | 'md';
};

const WithdrawBadge = ({ size = 'sm' }: Props) => {
  return <Style.WithdrawButton size={size}>탈퇴</Style.WithdrawButton>;
};

export default WithdrawBadge;
