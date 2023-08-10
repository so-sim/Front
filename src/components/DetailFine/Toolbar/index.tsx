import { useParams, useSearchParams } from 'react-router-dom';
import * as Style from './styles';
import { CheckDetailFine, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import CheckboxContainer from '@/components/@common/Checkbox';
import DetailListCheckBox from '../checkbox';
import { useGroupDetail } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { useRecoilState } from 'recoil';
import { initialSideModalState, sideModalState } from '@/store/sideModalState';

import useCheckListState from '@/hooks/useCheckListState';
import { SelectedEventInfo } from '@/types/event';

const Toolbar = () => {
  const { groupId } = useParams();

  // const {
  //   checkedDetailFine,
  //   setCheckedDetailFine: { setInitCheckedList },
  // } = useCheckedListState();

  const {
    checkDetailFineValues,
    checkedSize,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  const [sideModal, setSideModal] = useRecoilState(sideModalState);

  const { data: group } = useGroupDetail(Number(groupId));
  const { data: myNick } = useGetMyNikname(Number(groupId));
  const isAdmin = group?.content.isAdmin;
  const myNickname = myNick?.content.nickname;

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

  const moveSituationControlPage = () => {
    if (isSameSituation(checkDetailFineValues)) {
      setSideModal({ type: 'situation_change', isModal: true });
    } else {
      console.log('situation 동일해야함.');
    }
  };

  const moveSituationControlPageByMember = () => {
    if (isSameSituation(checkDetailFineValues) && isMyCheckDetailFine(checkDetailFineValues, myNickname!) && checkDetailFineValues[0].situation === '미납') {
      setSideModal({ type: 'situation_change', isModal: true });
    } else {
      console.log('팀원아 제대로해라');
    }
  };

  return (
    <>
      {!(checkedSize === 0) && (
        <Style.SituationControlWrapper>
          <CheckboxContainer id={'checkDetailFineLength'} isChecked={!(checkedSize === 0)} onChange={(event: React.MouseEvent<HTMLInputElement>) => initCheckDetailFine(event)}>
            <CheckboxContainer.Checkbox as={DetailListCheckBox} />
            {/*    이 부분 props를 자연스럽게 넘겨주려면 이 방법 밖에?? function으로 넘겨주는 방법도 있긴한데,  이거는 rest props 안넘어옴 */}
          </CheckboxContainer>
          {/* 여기 onChange는 임시 cache역할을 만들어서 비우고 다시 채우는 역할??  근데 비우면 없어짐  그래서 그냥 cache 필요없이 지우는 역할을 해야할 것 같다.  */}
          {/* fixed는 논의 후 추가 */}

          <Style.Label>{checkedSize}개 선택</Style.Label>
          <Style.DividingLine />
          {isAdmin ? (
            <>
              <Style.SituationControlButton onClick={moveSituationControlPage}>납부여부 변경</Style.SituationControlButton>
              <Style.DividingLine />
              <Style.SituationControlButton
                onClick={() => {
                  setSideModal({ type: 'alarm_request', isModal: true });
                }}
              >
                납부요청
              </Style.SituationControlButton>
            </>
          ) : (
            <Style.SituationControlButton onClick={moveSituationControlPageByMember}>확인요청</Style.SituationControlButton>
          )}
        </Style.SituationControlWrapper>
      )}
    </>
  );
};

export default Toolbar;
