import { ConfirmModalState, confirmModalState, initialConfirmModalState } from '@/store/confirmModalState';
import { useRecoilState } from 'recoil';

const useConfirmModal = () => {
  const [_, setConfirmModal] = useRecoilState(confirmModalState);

  const openConfirmModal = (confirmModalInfo: ConfirmModalState) => {
    setConfirmModal(confirmModalInfo);
  };

  const closeConfirmModal = () => {
    setConfirmModal(initialConfirmModalState);
  };

  return { openConfirmModal, closeConfirmModal };
};

export default useConfirmModal;
