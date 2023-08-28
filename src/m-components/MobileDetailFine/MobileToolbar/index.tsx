import CheckboxContainer from '@/components/@common/Checkbox';
import DetailListCheckBox from '@/components/DetailFine/checkbox';
import useValidateSituation from '@/hooks/Group/useValidateSituation';
import useCheckListState from '@/hooks/useCheckListState';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useGroupDetail } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { sideModalState, ModalType } from '@/store/sideModalState';
import { SelectedEventInfo } from '@/types/event';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import * as Style from './styles';
const MobileToolbar = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { data: group } = useGroupDetail(Number(groupId));
  const { data: myNick } = useGetMyNikname(Number(groupId));
  const myNickname = myNick?.content.nickname;
  const isAdmin = group?.content.isAdmin;

  const [sideModal, setSideModal] = useRecoilState(sideModalState);
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const {
    checkedSize,
    checkDetailFineValues,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  const { isSameSituationByServerState, isValidRequestPayment } = useValidateSituation();

  const initCheckDetailFine = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setInitCheckDetailFine();
  };

  const isSameSituation = (checkDetailFine: SelectedEventInfo[]) => {
    const situationOfCheckDetailFine = checkDetailFine.map(({ situation }) => situation);

    const isAllSameSituation = new Set(situationOfCheckDetailFine);

    return isAllSameSituation.size === 1;
  };

  const isMyCheckDetailFine = (checkDetailFineList: SelectedEventInfo[], myNickname: string) => checkDetailFineList.every(({ nickname }) => nickname === myNickname);

  const moveToSituationChangePage = async () => {
    if (!isAdmin) {
      if (isSameSituation(checkDetailFineValues) && isMyCheckDetailFine(checkDetailFineValues, myNickname!) && checkDetailFineValues[0].situation === '미납') {
        setSideModal({ type: 'situation_change', isModal: true });
        navigate(`/m-group/${groupId}/book/alarm`);
      } else {
        openConfirmModal({
          type: 'NOTICE_ONLY_MY_DETAIL',
          confirm: closeConfirmModal,
        });
        console.log('팀원아 제대로해라');
      }
      return;
    }

    const isValid = await isSameSituationByServerState();

    if (isValid) {
      setSideModal({ type: 'situation_change', isModal: true });
      navigate(`/m-group/${groupId}/book/alarm`);
    } else {
      openConfirmModal({
        type: 'CHANGE_ONLY_ONE_TYPE',
        confirm: closeConfirmModal,
      });
    }
  };

  const moveToAlarmRequestPage = async () => {
    const isValid = await isValidRequestPayment();

    if (isValid) {
      setSideModal({ type: 'alarm_request', isModal: true });
      navigate(`/m-group/${groupId}/book/alarm`);
    } else {
      openConfirmModal({
        type: 'NOTICE_CANNOT_REQUEST',
        confirm: closeConfirmModal,
      });
    }
  };

  if (checkedSize === 0) return null;
  return (
    <Style.ToolbarContainer>
      <CheckboxContainer id={'checkDetailFineLength'} isChecked={!(checkedSize === 0)} onChange={(event: React.MouseEvent<HTMLInputElement>) => initCheckDetailFine(event)}>
        <CheckboxContainer.Checkbox as={DetailListCheckBox} />
        {/*    이 부분 props를 자연스럽게 넘겨주려면 이 방법 밖에?? function으로 넘겨주는 방법도 있긴한데,  이거는 rest props 안넘어옴 */}
      </CheckboxContainer>
      <Style.Label>{checkedSize}개 선택</Style.Label>
      <Style.DividingLine />
      {isAdmin ? (
        <>
          <Style.Button onClick={moveToSituationChangePage}>납부여부 변경</Style.Button>
          <Style.DividingLine />
          <Style.Button onClick={moveToAlarmRequestPage}>납부요청</Style.Button>
        </>
      ) : (
        <Style.Button onClick={moveToSituationChangePage}>납부여부 변경</Style.Button>
      )}
    </Style.ToolbarContainer>
  );
};

export default MobileToolbar;
