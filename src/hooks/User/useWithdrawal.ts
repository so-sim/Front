import { useCanWithdrawl } from '@/queries/Auth/useCanWithdrawal';
import React, { useState } from 'react';
import useConfirmModal from '../useConfirmModal';

const useWithdrawal = () => {
  const [trigger, setTrigger] = useState(false);
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const handleWithdrawalModal = () => {
    openConfirmModal({ type: 'WITHDRAWAL_HAS_ADMIN', confirm: closeConfirmModal });
  };
  const { data } = useCanWithdrawl({ modalHandler: handleWithdrawalModal, trigger });

  const onClickWithdrawal = () => {
    setTrigger(true);
  };

  return {
    onClickWithdrawal,
  };
};

export default useWithdrawal;
