import { WITHDRAWAL_HEADER } from '@/constants/Withdrawal';
import React, { useState } from 'react';
import { WithdrawalReason, WithdrawalConfirm } from '@/components/Withdrawal';
import * as Style from './styles';
import { Header } from '@/components/Home';
import MobileLayout from '@/layouts/Mobile/MobileLayout';

const MobileWithdrawal = () => {
  const [pageState, setPageState] = useState<'CONFIRM' | 'REASON'>('CONFIRM');

  return (
    <MobileLayout location="HOME">
      <Style.ProgressBar>
        <Style.Progress pageState={pageState} />
      </Style.ProgressBar>
      <Style.Container>
        <Style.Header>
          {WITHDRAWAL_HEADER[`${pageState}`]}
          {pageState === 'REASON' && <Style.SubTitle>{WITHDRAWAL_HEADER.CONFIRM_DESC}</Style.SubTitle>}
        </Style.Header>
        {pageState === 'CONFIRM' ? <WithdrawalConfirm setPageState={setPageState} /> : <WithdrawalReason />}
      </Style.Container>
    </MobileLayout>
  );
};

export default MobileWithdrawal;
