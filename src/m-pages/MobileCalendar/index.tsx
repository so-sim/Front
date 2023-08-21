import { ARROW } from '@/assets/icons/Arrow';
import { MARK } from '@/assets/icons/Mark';
import { SYSTEM } from '@/assets/icons/System';
import { GA } from '@/constants/GA';
import useCalendarState from '@/hooks/Calendar/useCalendarState';
import useCalendarStatus from '@/hooks/Calendar/useCalendarStatus';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import { dateState, initialDateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import * as Style from './styles';

import MobileDetailFine from '@/m-components/MobileDetailFine';
import { useEffect } from 'react';
import { detailFineState } from '@/store/detailFineState';
import { useGroupDetail } from '@/queries/Group';
import { firstVisitState } from '@/store/firstVisitState';
import InviteModal from '@/components/@common/Modal/InviteModal';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 해당 부분 레이아웃 적용시키고,  기기에 따라서 높이가 반응형으로 대응을 해줘야할지 말지.. 고민
const MobileCalendar = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [{ isFirstVisit }, setIsFirstVisit] = useRecoilState(firstVisitState);

  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const [calendarDateState, setCalendarDateState] = useRecoilState(dateState);
  const { calendarDate, setCalendarDate, increaseMonth, decreaseMonth } = useCalendarState();
  const { monthList, filterCorrectDateStatus, isCurrentMonth, isToday, isSelectedDate } = useCalendarStatus(calendarDate, groupId);

  const [isOpen, setIsOpen] = useRecoilState(detailFineState);

  const handleGroupInviteModal = () => {
    setIsFirstVisit((prev) => ({ ...prev, isFirstVisit: false }));
  };

  const goToCreateFineBook = () => {
    navigate(`/m-group/${groupId}/create-finebook`);
    // 내역 추가 페이지로 라우팅
  };

  const goToDetailFine = (date: dayjs.Dayjs) => {
    setCalendarDateState((prev) => ({ ...prev, startDate: date, endDate: date, baseDate: date, mode: 'day' }));

    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    // setCalendarDateState(initialDateState);
    // 해당 코드때문에 내역추가 시 추가한 날짜로 이동을 안하고 있었습니다. (큰 문제는 제가 저 코드를 왜 넣었는지.. 기억이ㅠ)

    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <MobileLayout location="GROUP">
      <Style.Notification>
        <Style.NotificationTitle>벌금일정</Style.NotificationTitle>
        <Style.NotificationContent>모임 설정에서 알림을 등록해보세요!</Style.NotificationContent>
      </Style.Notification>
      <Style.CalendarBody>
        <Style.Container>
          <Style.DateControllerWrapper>
            <Style.DateText>{dayjs(calendarDate).format('YYYY년 MM월')}</Style.DateText>
            <Style.ArrowBlock id={GA.CALENDAR_SKIP.ALL}>
              <Style.ArrowWrapper onClick={decreaseMonth} id={GA.CALENDAR_SKIP.LEFT}>
                {ARROW.LEFT}
              </Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={increaseMonth} id={GA.CALENDAR_SKIP.RIGHT}>
                {ARROW.RIGHT}
              </Style.ArrowWrapper>
            </Style.ArrowBlock>
            <Style.ToolTipIconWrapper>{SYSTEM.TOOLTIP}</Style.ToolTipIconWrapper>
          </Style.DateControllerWrapper>
          <Style.DayOfTheWeekWrapper>
            {WEEKDATE.map((date) => (
              <Style.DayOfTheWeekText key={date}>{date}</Style.DayOfTheWeekText>
            ))}
          </Style.DayOfTheWeekWrapper>
          <Style.CalendarWrapper $length={monthList.length}>
            {monthList.map((week, index) => (
              <Style.WeekWrapper key={index}>
                {week.map((date) => {
                  const status = filterCorrectDateStatus(date);
                  // 컴포넌트 분리 및 라우팅 연결 필요
                  return (
                    <Style.DateWrapper key={index + date.date()} onClick={() => goToDetailFine(date)}>
                      <Style.DateTitle isSameMonth={isCurrentMonth(date)}>{date.date()}</Style.DateTitle>
                      <div>
                        {status && isCurrentMonth(date) && (
                          <>
                            {status['완납'] && !status['확인중'] && !status['미납'] ? <span>{MARK.BLUE}</span> : null}
                            {status['확인중'] ? <span>{MARK.YELLOW}</span> : null}
                            {status['미납'] ? <span>{MARK.RED}</span> : null}
                          </>
                        )}
                      </div>
                    </Style.DateWrapper>
                  );
                })}
              </Style.WeekWrapper>
            ))}
          </Style.CalendarWrapper>
          {isAdmin && <Style.AddIconWrapper onClick={goToCreateFineBook}>{SYSTEM.PLUS_WHITE}</Style.AddIconWrapper>}
          {/* 내역 추가 페이지로 라우팅 */}
        </Style.Container>
        <MobileDetailFine $isOpen={isOpen} setIsOpen={setIsOpen} />
      </Style.CalendarBody>
      {group?.content.isAdmin && isFirstVisit && <InviteModal onClick={handleGroupInviteModal} />}
    </MobileLayout>
  );
};

export default MobileCalendar;
