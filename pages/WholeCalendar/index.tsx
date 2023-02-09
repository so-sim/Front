import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ARROW } from '../../assets/icons/Arrow';
import { MARK } from '../../assets/icons/Mark';
import Button from '../../common/Button';
import createCalendar from '../../utils/createCalendar';
import * as Style from './styles';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WholeCalendar = () => {
  const [baseDate, setBaseDate] = useState(dayjs());
  const monthList = createCalendar(baseDate);

  const addMonth = () => {
    setBaseDate(baseDate.add(1, 'month'));
  };
  const subMonth = () => {
    setBaseDate(baseDate.subtract(1, 'month'));
  };

  return (
    <>
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
          <Button width="124px" color="black">
            내역 추가하기
          </Button>
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
                <Style.DateCell key={date.day()}>
                  <span>{date.date()}</span>
                  <Style.Tag color="red">
                    <div>{MARK.RED}</div>
                    <span>미납자 있음</span>
                    <span>(1)</span>
                  </Style.Tag>
                  <Style.Tag color="orange">
                    <div>{MARK.YELLOW}</div>
                    <span>관리자 승인 중</span>
                    <span>(1)</span>
                  </Style.Tag>
                  <Style.Tag color="blue">
                    <div>{MARK.BLUE}</div>
                    <span>모두 완납</span>
                  </Style.Tag>
                </Style.DateCell>
              ))}
            </Style.WeekWrap>
          ))}
        </Style.CalendarContainer>
      </Style.Layout>
    </>
  );
};

export default WholeCalendar;
