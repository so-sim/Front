import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { ARROW } from '../../../../assets/icons/Arrow';
import { MARK } from '../../../../assets/icons/Mark';
import createCalendar from '../../../../utils/createCalendar';
import * as Style from './styles';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MiniCalendar = () => {
  const [baseDate, setBaseDate] = useState(dayjs());
  const monthList = createCalendar(baseDate);
  const today = dayjs();

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === baseDate.month();
  };

  const isToday = (date: Dayjs) => {
    return date.format('YY-MM-DD') === today.format('YY-MM-DD');
  };

  const addMonth = () => {
    setBaseDate(baseDate.add(1, 'month'));
  };
  const subMonth = () => {
    setBaseDate(baseDate.subtract(1, 'month'));
  };

  return (
    <Style.Layout>
      <span>벌금 장부</span>
      <Style.Header>
        <div>
          <Style.DateHeader>{baseDate.format('YYYY년 MM월')}</Style.DateHeader>
          <div>
            <Style.ArrowWrapper onClick={subMonth}>{ARROW.LEFT}</Style.ArrowWrapper>
            <Style.ArrowWrapper onClick={addMonth}>{ARROW.RIGHT}</Style.ArrowWrapper>
          </div>
        </div>
      </Style.Header>
      <Style.WeekDate>
        {WEEKDATE.map((date) => (
          <div key={date}>{date}</div>
        ))}
      </Style.WeekDate>
      <Style.CalendarContainer length={monthList.length}>
        {monthList.map((weeks, idx) => (
          <Style.WeekWrap key={idx}>
            {weeks.map((date) => (
              <Style.DateCell isCurrentMonth={isCurrentMonth(date)}>
                <p>{date.date()}</p>
                <Style.TodayMark isToday={isToday(date)} />
                <Style.Mark>
                  <span>{MARK.BLUE}</span>
                  {/* <span>{MARK.YELLOW}</span> */}
                  {/* <span>{MARK.RED}</span> */}
                </Style.Mark>
              </Style.DateCell>
            ))}
          </Style.WeekWrap>
        ))}
      </Style.CalendarContainer>
    </Style.Layout>
  );
};

export default MiniCalendar;
