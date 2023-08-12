import { ARROW } from '@/assets/icons/Arrow';
import { MARK } from '@/assets/icons/Mark';
import { SYSTEM } from '@/assets/icons/System';
import { GA } from '@/constants/GA';
import useCalendarState from '@/hooks/Calendar/useCalendarState';
import useCalendarStatus from '@/hooks/Calendar/useCalendarStatus';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import MobileCalendarComponent from '@/m-components/MobileCalendar/index';

import * as Style from './styles';
import MobileDetailFine from '@/m-components/MobileDetailFine';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 해당 부분 레이아웃 적용시키고,  기기에 따라서 높이가 반응형으로 대응을 해줘야할지 말지.. 고민
const MobileCalendar = () => {
  const { groupId } = useParams();
  const [{ baseDate, startDate, endDate, mode }, setDateTestObj] = useRecoilState(dateState);

  const { calendarDate, setCalendarDate, increaseMonth, decreaseMonth } = useCalendarState();
  const { monthList, filterCorrectDateStatus, isCurrentMonth, isToday, isSelectedDate } = useCalendarStatus(calendarDate, groupId);

  return (
    <MobileLayout location="GROUP">
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
                  <Style.DateWrapper key={index + date.date()}>
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
        <Style.AddIconWrapper>{SYSTEM.PLUS_WHITE}</Style.AddIconWrapper>
        {/* 내역 추가 페이지로 라우팅 */}
      </Style.Container>
    </MobileLayout>
  );
};

export default MobileCalendar;
