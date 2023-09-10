import { ARROW } from '@/assets/icons/Arrow';
import { Button } from '@/components/@common';
import { initialSelectData } from '@/contexts/SelectedFineContext';
import useFinebook from '@/hooks/Group/useFinebook';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import MobileFineBookForm from '@/m-components/MobileFineBookForm';
import { useGetOneOfDetail } from '@/queries/Detail';
import { checkFormIsValid } from '@/utils/validation';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MobileUpdateFineBook = () => {
  const navigate = useNavigate();

  const searchParams = useSearchParams();
  const eventId = searchParams[0].get('eventId');
  const { data: detail, isSuccess } = useGetOneOfDetail(Number(eventId));

  const goBack = () => {
    navigate(-1);
  };

  const {
    selectData,
    updateLoading, //
    getFormFiledActions,
    convertSituationToText,
  } = useFinebook(initialSelectData);

  const { updateDetail, onInitFormByServerData } = getFormFiledActions();

  /**
   * 임시방편으로 서버에서 받아온 데이터를 reducer에 다시 한 번 저장하긴 했는데,
   * 확실히.. 안 좋은 거 같습니다. (어거지로 껴넣은 느낌)
   * SSR도입하면 여기도 고쳐보면 좋을 거 같습니다
   */
  useEffect(() => {
    if (isSuccess) {
      onInitFormByServerData(detail.content);
    }
  }, [isSuccess]);

  return (
    <ModalPageLayout title="내역 수정하기" left={{ icon: ARROW.LEFT, onClick: goBack }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <MobileFineBookForm //
          selectData={selectData}
          action={getFormFiledActions}
          convertSituationToText={convertSituationToText}
        />
        <Button //
          width="100%"
          height="42px"
          loading={updateLoading}
          color={checkFormIsValid(selectData) ? 'black' : 'disabled'}
          onClick={updateDetail}
        >
          저장하기
        </Button>
      </div>
    </ModalPageLayout>
  );
};

export default MobileUpdateFineBook;
