import { ARROW } from '@/assets/icons/Arrow';
import AlarmRequest_PaymentUpdate from '@/components/DetailFine/AlarmRequest_PaymentUpdate';
import useCheckListState from '@/hooks/useCheckListState';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { useNavigate } from 'react-router-dom';

const MobileAlarmRequest_Payment = () => {
  const { checkDetailFine } = useCheckListState();

  const navigate = useNavigate();
  console.log(checkDetailFine);

  const goBack = () => {
    navigate(-1);
  };

  // 새로고침에 대응필요   새로고침 시 스토리지 사용해서 보존할지, detail로 다시 옮길지

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="">
        {/* 모달 Layout 사용 시 padding문제 */}
        <AlarmRequest_PaymentUpdate checkDetailFine={{ ...checkDetailFine }} />
      </ModalPageLayout>
    </div>
  );
};

export default MobileAlarmRequest_Payment;
