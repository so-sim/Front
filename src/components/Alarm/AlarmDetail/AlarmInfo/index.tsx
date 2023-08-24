import SingleCheckedFineList from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SingleCheckedFineList';
import SituationButton from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SituationButton';
import { useGetDetailListById } from '@/queries/Detail/useGetDetailListById';
import { alarmInfoState, initAlarmInfoState } from '@/store/alarmInfoState';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import theme from '@/styles/Theme';

import { SelectedEventInfo, Situation } from '@/types/event';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as Style from './styles';
import { SituationStatus } from '@/types/notification';
import { useGroupDetail } from '@/queries/Group';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useUpdateDetailStatus } from '@/queries/Detail';

const SITUATION_FORMAT_STYLE: { [key in SituationStatus]: Situation } = {
  FULL: '완납',
  CHECK: '확인중',
  NONE: '미납',
};

const AlarmInfo = ({}) => {
  const [{ alarmEventIdList, nickname, groupId, afterSituation, beforeSituation }, setAlarmIdList] = useRecoilState(alarmInfoState);

  const [situationToChange, setSituationToChange] = useState<Situation>('완납');

  const navigate = useNavigate();

  useEffect(() => {
    (afterSituation === 'NONE' || afterSituation === null) && setSituationToChange('확인중');
    isAdmin && setSituationToChange('완납');
  }, []);

  const { data: group } = useGetMyNikname(groupId!);

  const myname = group?.content.nickname;

  const [checkedEventId, setCheckedEventId] = useState<number[]>([]);

  const { data: groupAdmin } = useGroupDetail(Number(groupId));

  const isAdmin = groupAdmin?.content.isAdmin;

  const { data, isLoading } = useGetDetailListById(groupId!, alarmEventIdList);

  const userName = data?.content.eventList[0]?.nickname;

  const isChecked = (eventId: number) => checkedEventId.includes(eventId);

  const toggleCheckedEventId = (details: SelectedEventInfo) => {
    if (isChecked(details.eventId)) {
      setCheckedEventId((prev) => prev.filter((item) => item !== details.eventId));
      return;
    }
    setCheckedEventId((prev) => [...prev, details.eventId]);
  };

  const onSuccess = () => {
    setAlarmIdList(initAlarmInfoState);
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccess);

  const updateSituation = () => {
    mutateDetailStatus({ situation: situationToChange, eventIdList: checkedEventId });
  };

  useEffect(() => {
    return () => {
      setAlarmIdList(initAlarmInfoState);
    };
  }, []);

  console.log(isAdmin);

  if (isLoading) return null;

  return (
    <>
      <Style.Title>{myname === nickname && `나의`} 내역 확인하기</Style.Title>
      {/* 해당 Alarm Info가 나의 닉네임과 같다면 */}
      <Style.ProfileWrapper>
        <p>아이콘</p>
        <Style.ProfimeText>{userName}</Style.ProfimeText>
      </Style.ProfileWrapper>

      <Style.SubTitle>
        선택된 모든 내역을{' '}
        <Style.UserLineSpan
          style={{
            textUnderlineOffset: '2px',
          }}
          $situation={situationToChange}
        >
          {situationToChange || '완납'}
        </Style.UserLineSpan>
        으로 {afterSituation === 'FULL' ? '변경되었습니다.' : '변경하시겠습니까?'}
      </Style.SubTitle>

      {afterSituation === 'FULL' ? (
        <SituationButton
          situationToChange={situationToChange}
          setSituationToChange={setSituationToChange}
          currentSituation={SITUATION_FORMAT_STYLE[beforeSituation!]}
          isAbleChange={false}
        />
      ) : // 확인중일 때 두 개 나오는거..   isAdmin 도 props도 바꿔주자
      afterSituation === 'CHECK' && isAdmin ? (
        <SituationButton situationToChange={situationToChange} setSituationToChange={setSituationToChange} currentSituation={'확인중'} />
      ) : isAdmin ? (
        <SituationButton
          situationToChange={situationToChange}
          setSituationToChange={setSituationToChange}
          currentSituation={beforeSituation === 'CHECK' ? '미납' : SITUATION_FORMAT_STYLE[afterSituation!] || '미납'}
        />
      ) : (
        <SituationButton situationToChange={situationToChange} setSituationToChange={setSituationToChange} currentSituation={SITUATION_FORMAT_STYLE[afterSituation!] || '미납'} />
      )}

      {data?.content.eventList && <SingleCheckedFineList checkDetailFine={data?.content.eventList} setCheckDetailFine={toggleCheckedEventId} isChecked={isChecked} />}

      <Style.Footer>
        <Style.Button onClick={isMobile ? () => navigate(-1) : () => setAlarmIdList(initAlarmInfoState)}>취소</Style.Button>

        <Style.Button isSubmit={true} onClick={updateSituation}>
          변경하기
        </Style.Button>
      </Style.Footer>
    </>
  );
};

export default AlarmInfo;

// after가 체크일때 Situation Button고민

// 총무가 바뀌었는데  승인대기Info를 가져올 경우 button도 disabled
// Recoil로 전역상태에 type을 추가해서 해도되긴 하지만 after가 check일 때(isAdmin과 같이) 줘도 되긴한다

// afterSituation이 다른경우 disabled

// hover  스타일 변경 singleList Checked 상태 추가

// isAdmin : false 인데  다른 사람 nickname에 대한 알람의 List를 View에 뿌려주려고 할 때 disabled로
// disabled 인데,,  상태값 다른 것도 disabled여야한다.

// 납부완료 (FULL)되었을 때   미납 , 승인대기 두개 다 있어야한다.
