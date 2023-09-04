import SingleCheckedFineList from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SingleCheckedFineList';
import SituationButton, { SITUATION_STATUS_FORMAT } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SituationButton';
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
import { Tooltip } from '@/components/@common/Tooltip';
import { Button } from '@/components/@common';
import useDisabledList from '@/hooks/useDisabledList';
import { detailFineState } from '@/store/detailFineState';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { USER } from '@/assets/icons/User';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';
import WithdrawBadge from '@/components/@common/WithdrawBadge';
import { convertToPriceFormat } from '@/utils/convertFormat';
import { CONVERT_SITUATION_FORMAT } from '@/constants/Situation';

const SITUATION_FORMAT_STYLE: { [key in SituationStatus]: Situation } = {
  FULL: '완납',
  CHECK: '확인중',
  NONE: '미납',
};

const filterDisabledList = (dataList: SelectedEventInfo[] | undefined, disabledEventIdList?: number[]) =>
  dataList?.filter((item) => !disabledEventIdList?.includes(item.eventId)).map((item) => item.eventId) || [];

/**
 * 알람을 눌러서 나오는 변경하기 페이지
 */
const AlarmInfo = ({}) => {
  const [{ alarmEventIdList, nickname, groupId, afterSituation, beforeSituation }, setAlarmIdList] = useRecoilState(alarmInfoState);

  const [situationToChange, setSituationToChange] = useState<Situation>('완납');

  const navigate = useNavigate();

  const { data: groupAdmin } = useGroupDetail(Number(groupId));

  const isAdmin = groupAdmin?.content.isAdmin;

  const [isOpen, setIsOpen] = useRecoilState(detailFineState);
  // Mobile에서 Calendar위에 detailList를 띄우는지 판별하는 Trigger

  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  const { isWithdrawal } = useWithdrawalParticipantList(Number(groupId));

  useEffect(() => {
    (afterSituation === 'NONE' || afterSituation === null) && setSituationToChange('확인중');
    isAdmin && setSituationToChange('완납');
  }, [isAdmin]);

  const { data, isLoading, disabledEventIdList, isDisabledItem } = useDisabledList(groupId!, alarmEventIdList, SITUATION_FORMAT_STYLE[afterSituation!]);

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
    setCheckedEventId([...filterDisabledList(data?.content.eventList, disabledEventIdList)]);
  }, [disabledEventIdList]);

  const { data: group } = useGetMyNikname(groupId!);

  const myname = group?.content.nickname;

  const [checkedEventId, setCheckedEventId] = useState<number[]>([]);

  const isChecked = (eventId: number) => checkedEventId.includes(eventId);

  const TotalAmount = data?.content.eventList?.reduce((prev, current) => (isChecked(current.eventId) ? prev + current.amount : prev + 0), 0);

  const userName = data?.content.eventList[0]?.nickname;

  const toggleCheckedEventId = (details: SelectedEventInfo) => {
    if (isChecked(details.eventId)) {
      setCheckedEventId((prev) => prev.filter((item) => item !== details.eventId));
      return;
    }
    setCheckedEventId((prev) => [...prev, details.eventId]);
  };

  const settingAlarmInfoNickname = () => {
    data && setAlarmIdList((prev) => ({ ...prev, nickname: data?.content.eventList[0].nickname }));
  };

  useEffect(() => {
    settingAlarmInfoNickname();
  }, [data]);

  const mobileOnSuccess = () => {
    setIsOpen(true);
    navigate(`/m-group/${groupId}/book`);
  };

  const onSuccess = () => {
    setAlarmIdList(initAlarmInfoState);
    isMobile && mobileOnSuccess();
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccess);

  const updateSituation = () => {
    mutateDetailStatus({ situation: situationToChange, eventIdList: checkedEventId });
  };

  useEffect(() => {
    return () => {
      setAlarmIdList((prev) => ({ ...prev, alarmEventIdList: [] }));
    };
  }, []);

  if (isLoading) return null;

  return (
    <>
      <Style.TextContainer>
        <Tooltip
          title={`납부여부를 변경해보세요!\n총무인 경우, 해당 내역의 팀원에게 알림이 가며\n팀원인 경우, 총무에게 승인 알림이 갑니다.`}
          contents={[]}
          width={312}
          location="TOP"
          top="-56px"
          left="0px"
          onCloseTooltip={() => localStorage.setItem('isFirstSituationTooltip', 'true')}
          defaultValue={localStorage.getItem('isFirstSituationTooltip') === null}
          messageBox={{ left: '0px', top: '37px' }}
          trigger={<Style.Title>{myname === nickname && `나의`} 내역 확인하기</Style.Title>}
        />
        {/* 해당 Alarm Info가 나의 닉네임과 같다면 */}

        <Style.ProfileWrapper>
          <p>{USER.PERSON_24}</p>
          <Style.ProfimeText>{userName}</Style.ProfimeText>
          {userName && isWithdrawal(userName) && <WithdrawBadge size="md" />}
        </Style.ProfileWrapper>

        <Style.SubTitle>
          선택된 모든 내역을{' '}
          <Style.UserLineSpan
            style={{
              textUnderlineOffset: '2px',
            }}
            $situation={situationToChange}
          >
            {CONVERT_SITUATION_FORMAT[situationToChange || '완납'] === '승인대기' ? '납부완료' : CONVERT_SITUATION_FORMAT[situationToChange || '완납']}
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

      <Style.DatePeriodContainer>
        <Style.DatePeriodText>
          {min_Date(sortedtList!)} - {max_Date(sortedtList!)}
        </Style.DatePeriodText>
        <Style.TotalAmount>{TotalAmount && convertToPriceFormat(TotalAmount)} 원</Style.TotalAmount>
      </Style.DatePeriodContainer>

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
