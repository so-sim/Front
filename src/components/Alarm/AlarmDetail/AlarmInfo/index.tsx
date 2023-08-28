import SingleCheckedFineList from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SingleCheckedFineList';
import SituationButton from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SituationButton';
import { useGetDetailListById } from '@/queries/Detail/useGetDetailListById';
import { alarmInfoState, initAlarmInfoState } from '@/store/alarmInfoState';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import theme from '@/styles/Theme';

import { SelectedEventInfo, Situation } from '@/types/event';

import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import * as Style from './styles';
import { SituationStatus } from '@/types/notification';
import { useGroupDetail } from '@/queries/Group';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useUpdateDetailStatus } from '@/queries/Detail';
import { Tooltip } from '@/components/@common/Tooltip';
import { Button } from '@/components/@common';
import useDisabledList from '@/hooks/useDisabledList';
import { detailFineState } from '@/store/detailFineState';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';

const SITUATION_FORMAT_STYLE: { [key in SituationStatus]: Situation } = {
  FULL: '완납',
  CHECK: '확인중',
  NONE: '미납',
};

const filterDisabledList = (dataList: SelectedEventInfo[] | undefined, disabledEventIdList?: number[]) =>
  dataList?.filter((item) => !disabledEventIdList?.includes(item.eventId)).map((item) => item.eventId) || [];

const AlarmInfo = ({}) => {
  const [alr, setAlarmIdList] = useRecoilState(alarmInfoState);

  const { alarmEventIdList, nickname, groupId, afterSituation, beforeSituation } = alr;
  console.log(alr);

  const [situationToChange, setSituationToChange] = useState<Situation>('완납');

  const navigate = useNavigate();

  const [searchParam, _] = useSearchParams();

  const { data: groupAdmin } = useGroupDetail(Number(groupId));

  const isAdmin = groupAdmin?.content.isAdmin;

  const [isOpen, setIsOpen] = useRecoilState(detailFineState);

  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  useEffect(() => {
    (afterSituation === 'NONE' || afterSituation === null) && setSituationToChange('확인중');
    isAdmin && setSituationToChange('완납');
  }, [isAdmin]);

  const { data, isLoading, isSuccess, disabledEventIdList, isDisabledItem } = useDisabledList(groupId, alarmEventIdList, SITUATION_FORMAT_STYLE[afterSituation!]);

  const stringToNumber_Date = (date: string) => +date?.replace(/\-/g, '');

  const sortedtList = data?.content.eventList.sort((a, b) => stringToNumber_Date(a.date) - stringToNumber_Date(b.date));

  const min_Date = (sortedtList: SelectedEventInfo[]) => sortedtList[0]?.date;
  const max_Date = (sortedtList: SelectedEventInfo[]) => sortedtList.at(-1)?.date;

  useEffect(() => {
    sortedtList &&
      setCalendarDate((prev) => ({
        ...prev,
        baseDate: dayjs(min_Date(sortedtList)),
        startDate: dayjs(min_Date(sortedtList)),
        endDate: dayjs(max_Date(sortedtList)),
        mode: 'custom',
      }));
  }, [data]);

  useEffect(() => {
    return () => {
      console.log('alarmInfo');
    };
  }, []);

  useEffect(() => {
    setCheckedEventId([...filterDisabledList(data?.content.eventList, disabledEventIdList)]);
  }, [disabledEventIdList]);

  const { data: group } = useGetMyNikname(groupId!);

  const myname = group?.content.nickname;

  const [checkedEventId, setCheckedEventId] = useState<number[]>([]);

  const userName = data?.content.eventList[0]?.nickname;

  const isChecked = (eventId: number) => checkedEventId.includes(eventId);

  const toggleCheckedEventId = (details: SelectedEventInfo) => {
    if (isChecked(details.eventId)) {
      setCheckedEventId((prev) => prev.filter((item) => item !== details.eventId));
      return;
    }
    setCheckedEventId((prev) => [...prev, details.eventId]);
  };

  const settingAlarmInfoNickname = () => {
    isSuccess && data && setAlarmIdList((prev) => ({ ...prev, nickname: data?.content.eventList[0].nickname }));
  };

  useEffect(() => {
    console.log('data');
    settingAlarmInfoNickname();
  }, [data]);

  useEffect(() => {
    console.log('alarmNickname');
  }, [nickname]);

  const resetList = useResetRecoilState(alarmInfoState);

  const mobileOnSuccess = () => {
    console.log('onSuccess');
    setIsOpen(true);
    setAlarmIdList(initAlarmInfoState);

    navigate(`/m-group/${groupId}/book`); // 업데이트 완료 후에 navigate 실행
  };

  console.log(isOpen);
  const onSuccess = () => {
    mobileOnSuccess();
    navigate(`/m-group/${groupId}/book`);
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccess);

  const updateSituation = () => {
    mutateDetailStatus({ situation: situationToChange, eventIdList: checkedEventId }, { onSuccess: () => setIsOpen(true) });
  };

  useEffect(() => {
    return () => {
      console.log('unmount');
      setAlarmIdList((prev) => ({ ...prev, alarmEventIdList: [] }));
    };
  }, []);

  if (isLoading) return null;

  return (
    <>
      <Style.TextContainer>
        <Tooltip
          title={`납부여부를 변경해보세요!\n변경 시, ${isAdmin ? '팀원' : '총무'}에게 알림이 갑니다.`}
          contents={[]}
          width={312}
          location="TOP"
          top="-56px"
          left="0px"
          defaultValue
          messageBox={{ left: '0px', top: '37px' }}
          trigger={<Style.Title>{myname === nickname && `나의`} 내역 확인하기</Style.Title>}
        />
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
      </Style.TextContainer>

      {afterSituation === 'FULL' && data?.content.eventList ? (
        <SingleCheckedFineList checkDetailFine={data?.content.eventList} setCheckDetailFine={toggleCheckedEventId} isChecked={() => false} noCheckBox={true} />
      ) : (
        data?.content.eventList && (
          <SingleCheckedFineList checkDetailFine={data?.content.eventList} setCheckDetailFine={toggleCheckedEventId} isChecked={isChecked} isDisabled={isDisabledItem} />
        )
      )}

      <Style.Footer>
        {afterSituation === 'FULL' ? (
          <Button width="100%" height="2.675rem" onClick={isMobile ? () => navigate(-1) : () => setAlarmIdList((prev) => ({ ...prev, alarmEventIdList: [] }))} color="white">
            취소
          </Button>
        ) : (
          <>
            <Button width="100%" height="2.675rem" onClick={isMobile ? () => navigate(-1) : () => setAlarmIdList((prev) => ({ ...prev, alarmEventIdList: [] }))} color="white">
              취소
            </Button>
            <Button
              width="100%"
              height="2.675rem"
              onClick={updateSituation}
              color={!(checkedEventId.length > 0) || (!isAdmin && afterSituation === 'CHECK') ? 'disabled' : 'black'}
            >
              변경하기
            </Button>
          </>
        )}
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
