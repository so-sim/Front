import { dateState } from '@/store/dateState';
import { handleDate } from '@/utils/handleDate';
import dayjs, { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
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
  const [dateObj, setDateObj] = useRecoilState(dateState);
  const today = dayjs();
  const { calendarBaseDate, week, detailBaseDate, selectedDate } = dateObj;
  const monthList = createCalendar(dayjs(calendarBaseDate));
  const navigate = useNavigate();
  const { groupId } = useParams();

  const { addMonth, subMonth, dateToFormmating, getMonth } = handleDate;

  const increaseMonth = () => {
    setDateObj((prev) => ({
      ...prev,
      calendarBaseDate: addMonth(prev.calendarBaseDate),
    }));
  };
  const decreaseMonth = () => {
    setDateObj((prev) => ({
      ...prev,
      calendarBaseDate: subMonth(prev.calendarBaseDate),
    }));
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === getMonth(calendarBaseDate);
  };

  const isToday = (date: Dayjs) => {
    return dateToFormmating(date) === dateToFormmating(today);
  };

  const isSelectedWeek = (index: number) => {
    return getMonth(detailBaseDate) === getMonth(calendarBaseDate) && index + 1 === week;
  };

  const isSelectedDate = (date: Dayjs) => {
    if (!selectedDate) return false;
    return dateToFormmating(selectedDate) === dateToFormmating(date);
  };

  const goDetail = (date: Dayjs) => {
    setDateObj((prev) => ({
      ...prev,
      calendarBaseDate: date,
      detailBaseDate: date,
      selectedDate: date,
      week: null,
    }));
    navigate(`/group/${groupId}/book/detail`);
  };

  return (
    <>
      <Style.Layout>
        <span>벌금 장부</span>
        <Style.Header>
          <div>
            <Style.DateHeader>{dayjs(dateObj.calendarBaseDate).format('YYYY년 MM월')}</Style.DateHeader>
            <div>
              <Style.ArrowWrapper onClick={decreaseMonth}>{ARROW.LEFT}</Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={increaseMonth}>{ARROW.RIGHT}</Style.ArrowWrapper>
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
                <div key={dateToFormmating(date)} onClick={() => goDetail(date)}>
                  {cellType === 'Tag' ? (
                    <DateCellWithTag date={date} isCurrentMonth={isCurrentMonth} isToday={isToday} isSelectedDate={isSelectedDate} />
                  ) : (
                    <DateCellWithMark date={date} isCurrentMonth={isCurrentMonth} isToday={isToday} isSelectedDate={isSelectedDate} isSelectedWeek={isSelectedWeek(idx)} />
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
function addMonth(calendarBaseDate: dayjs.Dayjs): dayjs.Dayjs {
  throw new Error('Function not implemented.');
}
