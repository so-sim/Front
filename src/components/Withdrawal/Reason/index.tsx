import { WITHDRAWAL_REASON } from '@/constants/Withdrawal';
import * as Style from './styles';
import { useState } from 'react';
import Button from '@/components/@common/Button';
import { useNavigate } from 'react-router-dom';
import useUserWithdrawalMutation from '@/queries/Auth/useUserWithdrawalMutation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import useConfirmModal from '@/hooks/useConfirmModal';

const WithdrawalReason = () => {
  const [selectedReason, setSelectedReason] = useState({ title: '', wording: '' });
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const { mutate: withdrawaMutate } = useUserWithdrawalMutation();

  const isChecked = (reason: string) => {
    return selectedReason.title === reason;
  };
  const handleWithdrawModal = () => {
    openConfirmModal({
      type: 'WITHDRAWAL_FINAL',
      confirm: onClickWithdrawal,
      cancel: closeConfirmModal,
    });
  };

  const handleChecked = (reason: { title: string; wording: string }) => {
    setSelectedReason(reason);
  };

  const onClickCancle = () => {
    navigate('/');
  };

  const onClickWithdrawal = () => {
    if (user.userId) {
      withdrawaMutate({ withdrawReason: selectedReason.wording });
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
    </>
  );
};

export default WithdrawalReason;
