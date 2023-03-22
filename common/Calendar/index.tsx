import { useQueryString } from '@/hooks/useQueryString';
import { dateToString } from '@/utils/dateToString';
import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ARROW } from '../../assets/icons/Arrow';
import Button from '../../common/Button';
import createCalendar from '../../utils/createCalendar';
import DateCellWithMark from './DateCellWithMark';
import DateCellWithTag from './DateCellWithTag';
import * as Style from './styles';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalnedrProps {
  cellType: 'Mark' | 'Tag';
}

const Calendar: FC<CalnedrProps> = ({ cellType }) => {
  const [baseDate, setBaseDate] = useState(dayjs());
  const today = dayjs();
  const monthList = createCalendar(baseDate);
  const navigate = useNavigate();
  const { groupId } = useParams();
  const queries = useQueryString();

  const { year, month, day } = queries;

  const addMonth = () => {
    const newDate = baseDate.add(1, 'month');
    const [year, month, day] = dateToString(newDate).split('-');
    navigate(`/group/${groupId}/book/detail?year=${year}&month=${month}&day=${day}`);
  };
  const subMonth = () => {
    const newDate = baseDate.subtract(1, 'month');
    const [year, month, day] = dateToString(newDate).split('-');
    navigate(`/group/${groupId}/book/detail?year=${year}&month=${month}&day=${day}`);
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === baseDate.month();
  };

  const isToday = (date: Dayjs) => {
    return dateToString(date) === dateToString(today);
  };

  const isSelected = (date: Dayjs) => {
    return dateToString(baseDate) === dateToString(date);
  };

  const goDetail = (date: Dayjs) => {
    const [year, month, day] = dateToString(date).split('-');
    navigate(`/group/${groupId}/book/detail?year=${year}&month=${month}&day=${day}`);
  };

  useEffect(() => {
    if (year) {
      setBaseDate(dayjs(`${year}-${month}-${day}`));
    }
  }, [year, month, day]);

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
          {cellType === 'Tag' && (
            <Button width="124px" color="black">
              내역 추가하기
            </Button>
          )}
        </Style.Header>
        <Style.WeekDate>
          {WEEKDATE.map((date) => (
            <div key={date}>{date}</div>
          ))}
        </Style.WeekDate>
        <Style.CalendarContainer length={monthList.length} mini={cellType === 'Mark'}>
          {monthList.map((weeks, idx) => (
            <Style.WeekWrap key={idx} cellType={cellType}>
              {weeks.map((date) => (
                <div key={dateToString(date)} onClick={() => goDetail(date)}>
                  {cellType === 'Tag' ? (
                    <DateCellWithTag date={date} isCurrentMonth={isCurrentMonth} isToday={isToday} isSelected={isSelected} />
                  ) : (
                    <DateCellWithMark date={date} isCurrentMonth={isCurrentMonth} isToday={isToday} isSelected={isSelected} />
                  )}
                </div>
              ))}
            </Style.WeekWrap>
          ))}
        </Style.CalendarContainer>
      </Style.Layout>
    </>
  );
};

export default Calendar;
