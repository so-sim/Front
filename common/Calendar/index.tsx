import { dateState } from '@/store/dateState';
import { handleDate } from '@/utils/handleDate';
import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ARROW } from '../../assets/icons/Arrow';
import Button from '../../common/Button';
import createCalendar from '../../utils/createCalendar';
import { FineBookModal } from '../Modal/FineBookModal';
import DateCellWithMark from './DateCellWithMark';
import DateCellWithTag from './DateCellWithTag';
import * as Style from './styles';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalnedrProps {
  cellType: 'Mark' | 'Tag';
}

const Calendar: FC<CalnedrProps> = ({ cellType }) => {
  const today = dayjs();
  const [dateObj, setDateObj] = useRecoilState(dateState);
  const { baseDate, week, selectedDate } = dateObj;
  const [showCreateDetailModal, setShowCreateDetailModal] = useState(false);
  const [calendarDate, setCalendarDate] = useState(baseDate);

  const monthList = createCalendar(dayjs(calendarDate));
  const navigate = useNavigate();
  const { groupId } = useParams();

  const { addMonth, subMonth, dateToFormmating, getMonth } = handleDate;

  const handleShowCreateDetailModal = () => {
    setShowCreateDetailModal((prev) => !prev);
  };

  const increaseMonth = () => {
    setCalendarDate(addMonth(calendarDate));
  };
  const decreaseMonth = () => {
    setCalendarDate(subMonth(calendarDate));
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === getMonth(calendarDate);
  };

  const isToday = (date: Dayjs) => {
    return dateToFormmating(date) === dateToFormmating(today);
  };

  const isSelectedWeek = (index: number) => {
    return getMonth(baseDate) === getMonth(calendarDate) && index + 1 === week;
  };

  const isSelectedDate = (date: Dayjs) => {
    if (!selectedDate) return false;
    return dateToFormmating(selectedDate) === dateToFormmating(date);
  };

  const goDetail = (date: Dayjs) => {
    setDateObj((prev) => ({
      ...prev,
      baseDate: date,
      selectedDate: date,
      week: null,
    }));
    navigate(`/group/${groupId}/book/detail`);
  };

  useEffect(() => {
    setCalendarDate(baseDate);
  }, [baseDate, week, selectedDate]);

  return (
    <>
      <Style.Layout>
        <span>벌금 장부</span>
        <Style.Header>
          <div>
            <Style.DateHeader>{dayjs(calendarDate).format('YYYY년 MM월')}</Style.DateHeader>
            <div>
              <Style.ArrowWrapper onClick={decreaseMonth}>{ARROW.LEFT}</Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={increaseMonth}>{ARROW.RIGHT}</Style.ArrowWrapper>
            </div>
          </div>
          {cellType === 'Tag' && (
            <Button width="124px" color="black" onClick={handleShowCreateDetailModal}>
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
      {showCreateDetailModal && <FineBookModal setOpen={setShowCreateDetailModal} />}
    </>
  );
};

export default Calendar;
