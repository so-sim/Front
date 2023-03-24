import { WITHDRAWAL_REASON } from '@/constants/Withdrawal';
import * as Style from './styles';
import React, { useState } from 'react';
import Button from '@/common/Button';
import { useNavigate } from 'react-router-dom';
import useUserWithdrawalMutation from '@/queries/Auth/useUserWithdrawalMutation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';

const WithdrawalReason = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const { mutate: withdrawaMutate } = useUserWithdrawalMutation();

  const isChecked = (reason: string) => {
    return selectedReason === reason;
  };

  const handleChecked = (reason: string) => {
    setSelectedReason(reason);
  };

  const onClickCancle = () => {
    navigate('/');
  };

  const onClickWithdrawal = () => {
    if (user.userId) {
      withdrawaMutate({ userId: user.userId, withdrawalGroundsType: selectedReason });
    }
  };

  return (
    <>
      {WITHDRAWAL_REASON.map((reason) => (
        <Style.Label>
          <input type="checkbox" checked={isChecked(reason.title)} onClick={() => handleChecked(reason.title)} />
          {reason.title}
        </Style.Label>
      ))}
      <Style.Footer>
        <Button color="white" width="150px" height="42px" onClick={onClickCancle}>
          취소
        </Button>
        <Button color={selectedReason ? 'black' : 'disabled'} width="150px" height="42px" onClick={onClickWithdrawal}>
          탈퇴하기
        </Button>
      </Style.Footer>
    </>
  );
};

export default WithdrawalReason;
