import React from 'react';
import * as Style from './styles';

const Notification = () => {
  return (
    <div style={{ width: '100%' }}>
      <Style.Body>벌금 대상자에게 벌금 납부일에 맞게 자동으로 알림이 발송되는 기능입니다. 정기적인 모임 일정이나, 벌금 납부일에 맞게 자동 알림을 설정해보세요!</Style.Body>
      <Style.DescWrapper>
        <Style.Asterisk>*</Style.Asterisk>
        [납부 전] 상태인 팀원에게 자동으로 발송됩니다.
      </Style.DescWrapper>
    </div>
  );
};

export default [<Notification />];
