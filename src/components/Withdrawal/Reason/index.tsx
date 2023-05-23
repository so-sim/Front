import { WITHDRAWAL_MODAL, WITHDRAWAL_REASON } from '@/constants/Withdrawal';
import * as Style from './styles';
import React, { useState } from 'react';
import Button from '@/components/@common/Button';
import { useNavigate } from 'react-router-dom';
import useUserWithdrawalMutation from '@/queries/Auth/useUserWithdrawalMutation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { TwoButtonModal } from '@/components/@common/Modal/TwoButtonModal';

const WithdrawalReason = () => {
  const [selectedReason, setSelectedReason] = useState({ title: '', wording: '' });
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const { mutate: withdrawaMutate } = useUserWithdrawalMutation();

  const isChecked = (reason: string) => {
    return selectedReason.title === reason;
  };
  const handleWithdrawModal = () => {
    setShowWithdrawModal((prev) => !prev);
  };

  const handleChecked = (reason: { title: string; wording: string }) => {
    setSelectedReason(reason);
  };

  const onClickCancle = () => {
    navigate('/');
  };

  const onClickWithdrawal = () => {
    if (user.userId) {
      withdrawaMutate({ userId: user.userId, withdrawalGroundsType: selectedReason.wording });
    }
  };

  return (
    <>
      {WITHDRAWAL_REASON.map((reason) => (
        <Style.Label key={reason.wording}>
          <input type="checkbox" checked={isChecked(reason.title)} onChange={() => handleChecked(reason)} />
          {reason.title}
        </Style.Label>
      ))}
      <Style.Footer>
        <Button color="white" width="150px" height="42px" onClick={onClickCancle}>
          취소
        </Button>
        <Button color={selectedReason ? 'black' : 'disabled'} width="150px" height="42px" onClick={handleWithdrawModal}>
          탈퇴하기
        </Button>
      </Style.Footer>
      {showWithdrawModal && (
        <TwoButtonModal
          width="448px"
          height="240px"
          title={WITHDRAWAL_MODAL.FINAL.title}
          description={WITHDRAWAL_MODAL.FINAL.desc}
          cancel={{ text: '취소', onClick: handleWithdrawModal }}
          confirm={{ text: '회원 탈퇴', onClick: onClickWithdrawal }}
          modalHandler={handleWithdrawModal}
        />
      )}
    </>
  );
};

export default WithdrawalReason;
