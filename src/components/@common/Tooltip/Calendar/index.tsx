import { MARK } from '@/assets/icons/Mark';
import React from 'react';
import * as Style from './styles';

const Calendar = () => {
  return (
    <Style.Frame>
      <div style={{ width: '100%' }}>
        <Style.Tag color="red">
          <span>{MARK.RED}</span>
          <span>납부 전</span>
        </Style.Tag>
        <Style.Body>벌금을 내지 않은 팀원이 있는 경우</Style.Body>
      </div>
      <div style={{ width: '100%' }}>
        <Style.Tag color="blue">
          <span>{MARK.BLUE}</span>
          <span>모두 납부</span>
        </Style.Tag>
        <Style.Body>모든 팀원이 벌금을 낸 경우</Style.Body>
      </div>
      <div style={{ width: '100%' }}>
        <Style.Tag color="orange">
          <span>{MARK.YELLOW}</span>
          <span>총무 승인대기</span>
        </Style.Tag>
        <Style.Body>벌금을 낸 후, 총무의 승인을 기다리는 팀원이 있는경우</Style.Body>
      </div>
    </Style.Frame>
  );
};

export default [<Calendar />];
