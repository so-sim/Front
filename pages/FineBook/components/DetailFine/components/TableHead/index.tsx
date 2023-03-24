import React from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';

export const TableHead = () => {
  return (
    <Style.TableHead>
      <span>날짜</span>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span>납부여부</span>
        <span style={{ height: '16px', marginLeft: '8px' }}>{ARROW.DOWN_SM}</span>
      </span>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span>팀원</span>
        <span style={{ height: '16px', marginLeft: '8px' }}>{ARROW.DOWN_SM}</span>
      </span>
      <span>금액</span>
      <span>사유</span>
    </Style.TableHead>
  );
};
