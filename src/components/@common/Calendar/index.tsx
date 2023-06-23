import { GA } from '@/constants/GA';
import { useGetMonthStatus } from '@/queries/Detail/useGetMonthStatus';
import { useGroupDetail } from '@/queries/Group';
import { dateStateTest } from '@/store/dateStateTest';
import createCalendar from '@/utils/createCalendar';
import { handleDate } from '@/utils/handleDate';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ARROW } from '../../../assets/icons/Arrow';
import Button from '../Button';
import FineBookCreateModal from '../Modal/FineBookModal/FineBookCreateModal';
import DateCellWithMark from './DateCellWithMark';
import DateCellWithTag from './DateCellWithTag';

import * as Style from './styles';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalnedrProps {
  cellType: 'Mark' | 'Tag';
}

const Calendar: FC<CalnedrProps> = ({ cellType }) => {
  const today = dayjs();

  const [{ baseDateTest, startDate, endDate, mode }, setDateTestObj] = useRecoilState(dateStateTest);
  const [showCreateDetailModal, setShowCreateDetailModal] = useState(false);
  const [calendarDate, setCalendarDate] = useState(baseDateTest);

  const monthList = createCalendar(dayjs(calendarDate));
  const navigate = useNavigate();
  const { groupId } = useParams();

  const { addMonth, subMonth, dateToFormmating, getMonth, getDate, dateToUnixTime } = handleDate;

  const startDateOfMonth = dateToFormmating(dayjs(calendarDate).startOf('month'));
  const endDateOfMonth = dateToFormmating(dayjs(calendarDate).endOf('month'));

  const { data: status } = useGetMonthStatus(groupId, startDateOfMonth, endDateOfMonth);

  const { data: groupData } = useGroupDetail(Number(groupId));

  const filterCorrectDateStatus = (date: Dayjs) => {
    const hasStatusOfDay = status?.content.statusOfDay.hasOwnProperty(getDate(date));

    if (hasStatusOfDay) return status?.content.statusOfDay[getDate(date)];
  };

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

  const isSelectedPeriod = (date: Dayjs) => {
    return dateToUnixTime(startDate) <= dateToUnixTime(date) && dateToUnixTime(endDate) >= dateToUnixTime(date);
  };

  const isSelectedDate = (date: Dayjs) => {
    if (mode !== 'day') return false;
    return dateToFormmating(startDate) === dateToFormmating(date);
  };

  const goDetail = (date: Dayjs) => {
    setDateTestObj((prev) => ({
      ...prev,
      baseDateTest: date,
      startDate: date,
      endDate: date,
      mode: 'day',
    }));
    navigate(`/group/${groupId}/book/detail`);
  };

  useEffect(() => {
    setCalendarDate(baseDateTest);
  }, [baseDateTest, startDate, endDate]);

  return (
    <>
      <Style.Layout>
        <Style.Title>벌금 장부</Style.Title>
        <Style.Header>
          <div>
            <Style.DateHeader>{dayjs(calendarDate).format('YYYY년 MM월')}</Style.DateHeader>
            <Style.ArrowBlock id={GA.CALENDAR_SKIP.ALL}>
              <Style.ArrowWrapper onClick={decreaseMonth} id={GA.CALENDAR_SKIP.LEFT}>
                {ARROW.LEFT}
              </Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={increaseMonth} id={GA.CALENDAR_SKIP.RIGHT}>
                {ARROW.RIGHT}
              </Style.ArrowWrapper>
            </Style.ArrowBlock>
          </div>
          {cellType === 'Tag' && groupData?.content.isAdmin && (
            <Button width="124px" color="black" onClick={handleShowCreateDetailModal} id={GA.ADD_LIST.BUTTON}>
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
                    <DateCellWithTag //
                      date={date}
                      isCurrentMonth={isCurrentMonth}
                      isToday={isToday}
                      isSelectedDate={isSelectedDate}
                      status={filterCorrectDateStatus(date)}
                    />
                  ) : (
                    <DateCellWithMark
                      date={date}
                      startDate={startDate}
                      endDate={endDate}
                      mode={mode}
                      isCurrentMonth={isCurrentMonth}
                      isToday={isToday}
                      isSelectedDate={isSelectedDate}
                      isSelectedPeriod={isSelectedPeriod(date)}
                      status={filterCorrectDateStatus(date)}
                    />
                  )}
                </div>
              ))}
            </Style.WeekWrap>
          ))}
        </Style.CalendarContainer>
      </Style.Layout>
      {showCreateDetailModal && <FineBookCreateModal modalHandler={handleShowCreateDetailModal} />}
    </>
  );
};

export default Calendar;
