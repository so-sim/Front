import { MARK } from '@/assets/icons/Mark';
import React from 'react';
import * as Style from './styles';

const PaymentRequest = () => {
  return (
    <Style.Body>
      팀원에게 직접 벌금 납부를 요청할 수 있는 기능입니다.
      {
        <Style.Tag color="red">
          <span>{MARK.RED}</span>
          <span>납부 전</span>
        </Style.Tag>
      }
      상태의 팀원에게만 요청할 수 있으며, 해당 팀원에게 알림이 발송됩니다.
    </Style.Body>
  );
};

export default [<PaymentRequest />];
