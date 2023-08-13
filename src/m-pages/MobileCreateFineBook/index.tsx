import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import { Button } from '@/components/@common';
import { initialSelectData } from '@/contexts/SelectedFineContext';
import useFinebook from '@/hooks/Group/useFinebook';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import MobileFineBookForm from '@/m-components/MobileFineBookForm';
import { checkFormIsValid } from '@/utils/validation';
import { useNavigate } from 'react-router-dom';

const MobileCreateFineBook = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { selectData, getFormFiledActions, convertSituationToText, createLoading } = useFinebook(initialSelectData);
  const { createDetail } = getFormFiledActions();
  return (
    <ModalPageLayout title="내역 추가하기" left={{ icon: ARROW.LEFT, onClick: goBack }}>
      <MobileFineBookForm //
        selectData={selectData}
        action={getFormFiledActions}
        convertSituationToText={convertSituationToText}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button //
          width="100%"
          height="42px"
          loading={createLoading}
          color={checkFormIsValid(selectData) ? 'black' : 'disabled'}
          onClick={createDetail}
        >
          추가하기
        </Button>
        <Button //
          width="100%"
          height="42px"
          leftIcon={SYSTEM.PLUS_BLACK_SM}
          color={checkFormIsValid(selectData) ? 'white' : 'white-disabled'}
          onClick={createDetail}
        >
          계속해서 추가하기
        </Button>
      </div>
    </ModalPageLayout>
  );
};

export default MobileCreateFineBook;
