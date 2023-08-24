import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import theme from '@/styles/Theme';
import { CheckDetailFine, SelectedEventInfo_Checked, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import { useUpdateDetailStatus } from '@/queries/Detail';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CheckedFineList from './CheckedFineList';
import { useParticipantList } from '@/queries/Group';
import { useEffect, useState } from 'react';
import { SelectedEventInfo, Situation } from '@/types/event';
import { useGroupDetail } from '@/queries/Group';
import { useSelectedContext, initialSelectData } from '@/contexts/SelectedFineContext';
import { useRequestNotification } from '@/queries/Notification/useRequestNotifaction';
import { useRecoilState } from 'recoil';
import { initialSideModalState, sideModalState } from '@/store/sideModalState';
import SituationButton from './SituationButton';
import SingleCheckedFineList from './SingleCheckedFineList';
import useCheckListState, { addCheckDetailFine, subtractCheckDetailFine } from '@/hooks/useCheckListState';
import { CheckListState } from '@/store/checkListState';
import useCheckSet from './hooks/useCheckSet';
import { isMobile } from 'react-device-detect';
import { Tooltip } from '@/components/@common/Tooltip';

type Props = {
  checkDetailFine: CheckListState;
};

type StatusType = {
  [key: string]: {
    title: JSX.Element;
    subTitle: (situationToChange?: Situation) => JSX.Element;
  };
};

export const Status: StatusType = {
  situation_change: {
    title: (
      <Tooltip
        title={`납부여부를 변경해보세요!\n
변경 시, 팀원에게 알림이 갑니다.`}
        contents={[]}
        width={312}
        location="TOP"
        top="40px"
        left="-204px"
        defaultValue
        messageBox={{ left: '280px', top: '-8px' }}
        trigger={<Style.Title>납부여부 변경하기</Style.Title>}
      />
    ),

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

/**
 * @description CheckedFineList에서 멤버 별로 check가 되기때문에, 멤버에 해당하는 CheckList 내역을 toggle 해주는 함수이다..
 * 여기서부터 조금 정신이 나가서 제대로 안적은 곳이 있을 수 있는데,, 따금한 지적부탁드립니다 ㅎㅎ...
 */
const filterByNickName = (prev: CheckListState, name: string, list: SelectedEventInfo[]) => {
  if (Object.values(prev).some((key) => name === key.nickname)) {
    return Object.fromEntries(Object.entries(prev).filter(([key, value]) => value.nickname !== name));
  }

  return { ...prev, ...Object.fromEntries(Object.values(list!)?.map((list) => [list.eventId, list])) };
};

const AlarmRequest_PaymentUpdate = ({ checkDetailFine }: Props) => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [sideModal, setSideModal] = useRecoilState(sideModalState);

  const originalCheckListValue = Object.values(checkDetailFine);

  const [checkList, setCheckList] = useState(checkDetailFine);
  // 음 이렇게 넣는건 복사가 안되는구나?? 생성과 동시에 삽입하려했는데, 기대했던 것과는 다르게 checkList undefined 이네요..

  useEffect(() => {
    setCheckList(checkDetailFine);
  }, [checkDetailFine]);

  const eventIdList = Object.keys(checkList);
  const detailFineList = Object.values(checkList);

  const setSubtractCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckList((prev) => subtractCheckDetailFine(detail, prev));
  };

  const setAddCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckList((prev) => addCheckDetailFine(detail, prev));
  };

  const isChecked = (eventId: number) => eventIdList.includes(String(eventId));

  const setToggleCheckList = (detail: SelectedEventInfo) => {
    if (!isChecked(detail.eventId)) {
      setAddCheckDetailFine(detail);
      return;
    }
    setSubtractCheckDetailFine(detail);
  };

  const setToggleCheckListByName = (name: string, list: SelectedEventInfo[]) => {
    setCheckList((prev) => filterByNickName(prev, name, list));
  };

  // checkList에 관한 setter및 함수를 모아뒀는데,  hook으로 빼야되나 고민이 된다. (setToggleCheckListByName 제외하고는 형태가 useCheckListState와 동일하다)

  const {
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  const { type, isModal } = sideModal;

  const [situationToChange, setSituationToChange] = useState<Situation>('완납');

  const { data: participantData } = useParticipantList(Number(groupId));

  const participantList = [participantData?.content.adminNickname, ...(participantData?.content.nicknameList || [])];

  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const currentSituation = detailFineList[0]?.situation;

  useEffect(() => {
    if (currentSituation === '완납') {
      setSituationToChange('미납');
    } else if (!isAdmin) {
      setSituationToChange('확인중');
    } else {
      setSituationToChange('완납');
    }
  }, [checkDetailFine, isAdmin]);
  // 깜빡임 해결이 필요..

  const closePage = () => {
    setSideModal(initialSideModalState);
  };

  const onSuccess = () => {
    closePage();
    setInitCheckDetailFine();
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccess);
  const { mutate: mutateRequestNotification } = useRequestNotification(onSuccess);

  const currentCheckList = eventIdList.map((eventId) => Number(eventId));

  const updateSituation = () => {
    mutateDetailStatus({ situation: situationToChange, eventIdList: currentCheckList });
  };

  const requestAlarm = () => {
    mutateRequestNotification();
  };
  // 백엔드 API명세에 아직 추가되어있지않음

  const stringToNumber_Date = (date: string) => +date?.replace(/\./g, '');

  const sortedtList = originalCheckListValue.sort((a, b) => stringToNumber_Date(a.date) - stringToNumber_Date(b.date));

  const participantSituation_List = (nickName: string, sortedtList: SelectedEventInfo[]) => sortedtList?.filter((item) => item.nickname === nickName);

  const TotalAmount = detailFineList?.reduce((prev, current) => prev + current.amount, 0);

  const isSingleList = (sortedList: SelectedEventInfo[]) => {
    const situationOfCheckDetailFine = sortedList.map(({ nickname }) => nickname);

    const isAllSameSituation = new Set(situationOfCheckDetailFine);

    return isAllSameSituation.size === 1;
  };

  // 해당 로직을 ItemList에서 toggle이 실행되었을 때 해주어도 좋을 것 같다.

  const max_Date = (sortedtList: SelectedEventInfo[]) => sortedtList.at(-1)?.date;

  const min_Date = (sortedtList: SelectedEventInfo[]) => sortedtList[0]?.date;

  if (!isModal) return null;

  return (
    <>
      <Style.Main $isMobile={isMobile}>
        {/* Title 영역 */}
        {type && Status[type].title}
        {type && Status[type].subTitle(situationToChange)}

        {/* Situation 변경 확인 Buttons */}
        {
          type === 'situation_change' && <SituationButton situationToChange={situationToChange} setSituationToChange={setSituationToChange} currentSituation={currentSituation} />
          // 스타일 재정의 필요
        }

        {/* List의 기간 */}
        <Style.DatePeriodContainer>
          <Style.DatePeriodText>
            {min_Date(sortedtList)} - {max_Date(sortedtList)}
          </Style.DatePeriodText>
          {isSingleList(originalCheckListValue) && <Style.TotalAmount>{TotalAmount} 원</Style.TotalAmount>}
        </Style.DatePeriodContainer>

        {/* List 영역 */}
        <Style.ListContainer>
          {isSingleList(originalCheckListValue) ? (
            <SingleCheckedFineList checkDetailFine={originalCheckListValue} setCheckDetailFine={setToggleCheckList} isChecked={isChecked} />
          ) : (
            participantList?.map((nickName) => (
              <CheckedFineList
                key={nickName}
                myName={nickName as string}
                list={participantSituation_List(nickName as string, sortedtList)}
                isChecked={isChecked}
                setCheckDetailFine={setToggleCheckListByName}
              />
            ))
          )}
        </Style.ListContainer>
      </Style.Main>
      {/* 하위 Button 컴포넌트 */}
      <Style.Footer>
        <Style.Button onClick={isMobile ? () => navigate(-1) : closePage}>취소</Style.Button>

        <Style.Button isSubmit={true} onClick={type === 'situation_change' ? updateSituation : requestAlarm}>
          변경하기
        </Style.Button>
      </Style.Footer>
    </>
  );
};

const DesktopFrame = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Style.UserDetailsFrame>{children}</Style.UserDetailsFrame>
      <Style.BackDrop />
    </>
  );
};

const DesktopHeader = () => {
  const [sideModal, setSideModal] = useRecoilState(sideModalState);

  const closePage = () => {
    setSideModal(initialSideModalState);
  };
  return (
    <Style.Header>
      <Style.CloseIcon onClick={closePage}>{SYSTEM.CLOSE_LG}</Style.CloseIcon>
      <span>닫기</span>
    </Style.Header>
  );
};

AlarmRequest_PaymentUpdate.DesktopFrame = DesktopFrame;
AlarmRequest_PaymentUpdate.DesktopHeader = DesktopHeader;

export default AlarmRequest_PaymentUpdate;
