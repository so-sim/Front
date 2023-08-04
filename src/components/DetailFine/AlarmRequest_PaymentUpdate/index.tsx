import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import theme from '@/styles/Theme';
import { CheckDetailFine, SelectedEventInfo_Checked, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import { useUpdateDetailStatus } from '@/queries/Detail';
import { useParams, useSearchParams } from 'react-router-dom';
import CheckedFineList from './CheckedFineList';
import { useParticipantList } from '@/queries/Group';
import { useEffect, useState } from 'react';
import { Situation } from '@/types/event';
import { useGroupDetail } from '@/queries/Group';
import { useSelectedContext, initialSelectData } from '@/contexts/SelectedFineContext';
import { useRequestNotification } from '@/queries/Notification/useRequestNotifaction';
import { useRecoilState } from 'recoil';
import { initialSideModalState, sideModalState } from '@/store/sideModalState';
import SituationButton from './SituationButton';
import SingleCheckedFineList from './SingleCheckedFineList';

type Props = {
  checkDetailFine: SelectedEventInfo_Checked[];
  setCheckDetailFine: SetCheckDetailFine;
};

type StatusType = {
  [key: string]: {
    title: JSX.Element;
    subTitle: (situationToChange?: Situation) => JSX.Element;
  };
};

const Status: StatusType = {
  situation_change: {
    title: <Style.Title>납부 여부 변경하기</Style.Title>,
    subTitle: (situationToChange?: Situation) => (
      <Style.SubTitle>
        선택된 모든 내역을{' '}
        <span
          style={{
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            color: situationToChange === '완납' ? theme.colors.primary_600 : theme.colors.red_600,
          }}
        >
          {situationToChange}
        </span>
        으로 변경하시겠습니까?
      </Style.SubTitle>
    ),
  },
  alarm_request: {
    title: <Style.Title>납부 요청하기</Style.Title>,
    subTitle: () => <Style.SubTitle>선택된 팀원에게 벌금 알림을 보내시겠습니까?</Style.SubTitle>,
  },
};

// 지금 총무 checkBox 클릭을 어떻게 할건지 얘기를 나눠봐야함

// 이 부분 situationType 붙여서 컴포넌트 화 예정입니다 (아니면 HOC패턴으로 리팩토링?)

const AlarmRequest_PaymentUpdate = ({ checkDetailFine, setCheckDetailFine }: Props) => {
  const { groupId } = useParams();

  const [sideModal, setSideModal] = useRecoilState(sideModalState);

  const { type, isModal } = sideModal;

  const [situationToChange, setSituationToChange] = useState<Situation>('완납');

  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

  const { setInitCheckDetailFine, setToggleCheckDetailFine } = setCheckDetailFine;

  const { data: participantData } = useParticipantList(Number(groupId));

  const participantList = [participantData?.content.adminNickname, ...(participantData?.content.nicknameList || [])];

  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const currentSituation = checkDetailFine[0]?.situation;

  useEffect(() => {
    if (currentSituation === '완납') {
      setSituationToChange('미납');
    } else if (!isAdmin) {
      setSituationToChange('확인중');
    } else {
      setSituationToChange('완납');
    }
  }, [checkDetailFine]);

  const closePage = () => {
    setSideModal(initialSideModalState);
  };

  const onSuccess = () => {
    closePage();
    setInitCheckDetailFine();
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccess);
  const { mutate: mutateRequestNotification } = useRequestNotification(onSuccess);

  const currentCheckList = checkDetailFine.filter(({ checked }) => checked === true).map(({ eventId }) => eventId);

  const updateSituation = () => {
    mutateDetailStatus({ situation: situationToChange, eventIdList: currentCheckList });
  };

  const requestAlarm = () => {
    mutateRequestNotification();
  };
  // 백엔드 API명세에 아직 추가되어있지않음

  const stringToNumber_Date = (date: string) => +date?.replace(/\./g, '');

  const sortedtList = checkDetailFine.sort((a, b) => stringToNumber_Date(a.date) - stringToNumber_Date(b.date));

  const participantSituation_List = (nickName: string, sortedtList: SelectedEventInfo_Checked[]) => sortedtList?.filter((item) => item.nickname === nickName);

  const TotalAmount = checkDetailFine?.reduce((prev, current) => prev + current.amount, 0);

  const isSingleList = (sortedList: SelectedEventInfo_Checked[]) => {
    const situationOfCheckDetailFine = sortedList.map(({ nickname }) => nickname);

    const isAllSameSituation = new Set(situationOfCheckDetailFine);

    return isAllSameSituation.size === 1;
  };

  // 해당 로직을 ItemList에서 toggle이 실행되었을 때 해주어도 좋을 것 같다.

  const max_Date = (sortedtList: SelectedEventInfo_Checked[]) => sortedtList.at(-1)?.date;

  const min_Date = (sortedtList: SelectedEventInfo_Checked[]) => sortedtList[0]?.date;

  if (!isModal) return null;

  return (
    <>
      <Style.UserDetailsFrame onClick={(e) => e.stopPropagation()}>
        <Style.Header>
          <Style.CloseIcon onClick={closePage}>{SYSTEM.CLOSE_LG}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Header>

        <Style.Main>
          {/* Title 영역 */}
          {type && Status[type].title}
          {type && Status[type].subTitle(situationToChange)}

          {/* Situation 변경 확인 Buttons */}
          {type === 'situation_change' && (
            <SituationButton situationToChange={situationToChange} setSituationToChange={setSituationToChange} currentSituation={currentSituation} />
            // 스타일 재정의 필요
          )}

          {/* List의 기간 */}
          <Style.DatePeriodContainer>
            <Style.DatePeriodText>
              {min_Date(sortedtList)} - {max_Date(sortedtList)}
            </Style.DatePeriodText>
            {isSingleList(sortedtList) && <Style.TotalAmount>{TotalAmount} 원</Style.TotalAmount>}
          </Style.DatePeriodContainer>

          {/* List 영역 */}
          <Style.ListContainer>
            {isSingleList(checkDetailFine) ? (
              <SingleCheckedFineList checkDetailFine={checkDetailFine} setCheckDetailFine={setToggleCheckDetailFine} />
            ) : (
              participantList?.map((nickName) => (
                <CheckedFineList
                  key={nickName}
                  myName={nickName as string}
                  list={participantSituation_List(nickName as string, sortedtList)}
                  setCheckDetailFine={setCheckDetailFine}
                />
              ))
            )}
          </Style.ListContainer>
        </Style.Main>
        {/* 하위 Button 컴포넌트 */}
        <Style.Footer>
          <Style.Button>취소</Style.Button>

          <Style.Button isSubmit={true} onClick={type === 'situation_change' ? updateSituation : requestAlarm}>
            변경하기
          </Style.Button>
        </Style.Footer>
      </Style.UserDetailsFrame>
      <Style.BackDrop onClick={(e) => e.stopPropagation()} />
    </>
  );
};

export default AlarmRequest_PaymentUpdate;
