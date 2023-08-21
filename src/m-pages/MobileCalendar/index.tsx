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
import MobileCalendarComponent from '@/m-components/MobileCalendar/index';

import * as Style from './styles';
import MobileDetailFine from '@/m-components/MobileDetailFine';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MobileDetailFineList from '@/m-components/MobileDetailFine/MobileDetailFineList';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 해당 부분 레이아웃 적용시키고,  기기에 따라서 높이가 반응형으로 대응을 해줘야할지 말지.. 고민
const MobileCalendar = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [calendarDateState, setCalendarDateState] = useRecoilState(dateState);
  const { calendarDate, setCalendarDate, increaseMonth, decreaseMonth } = useCalendarState();
  const { monthList, filterCorrectDateStatus, isCurrentMonth, isToday, isSelectedDate } = useCalendarStatus(calendarDate, groupId);

  const [isOpen, setIsOpen] = useState(false);

  const goToCreateFineBook = () => {
    navigate(`/m-group/${groupId}/create-finebook`);
    // 내역 추가 페이지로 라우팅
  };

  useEffect(() => {
    setCalendarDateState(initialDateState);
  }, []);

  const goToDetailFine = (date: dayjs.Dayjs) => {
    setCalendarDateState((prev) => ({ ...prev, startDate: date, endDate: date, baseDate: date, mode: 'day' }));
    // navigate(`/m-group/${groupId}/book/detail`);
    setIsOpen((prev) => !prev);
  };

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
                      <Style.DateTitle>{date.date()}</Style.DateTitle>
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
          <Style.AddIconWrapper onClick={goToCreateFineBook}>{SYSTEM.PLUS_WHITE}</Style.AddIconWrapper>
          {/* 내역 추가 페이지로 라우팅 */}
        </Style.Container>

        <MobileDetailFine $isOpen={isOpen} setIsOpen={setIsOpen} />
      </Style.CalendarBody>
    </MobileLayout>
  );
};

export default MobileCalendar;
