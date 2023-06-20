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

  const [{ baseDateTest, startDate, endDate }, setDateTestObj] = useRecoilState(dateStateTest);

  const [showCreateDetailModal, setShowCreateDetailModal] = useState(false);
  const [calendarDate, setCalendarDate] = useState(baseDateTest);

  const monthList = createCalendar(dayjs(baseDateTest));
  const navigate = useNavigate();
  const { groupId } = useParams();

  const { addMonth, subMonth, dateToFormmating, getMonth, getDateArray, getDate } = handleDate;

  const [year, month, day] = getDateArray(calendarDate);

  const { data: status } = useGetMonthStatus(groupId, year, month);

  const { data: groupData } = useGroupDetail(Number(groupId));

  const filterCorrectDateStatus = (date: Dayjs) => {
    return status?.content.filter((list) => list.day === getDate(date))[0];
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

  // Todo 커스텀기간 필터링 추가 시 리팩토링 예정
  // const isSelectedWeek = (index: number) => {
  //   return getMonth(baseDateTest) === getMonth(calendarDate) && index + 1 === week;
  // };

  const isSelectedDate = (date: Dayjs) => {
    if (!dayjs(startDate).isSame(dayjs(endDate))) return false;
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
                    <DateCellWithTag date={date} isCurrentMonth={isCurrentMonth} isToday={isToday} isSelectedDate={isSelectedDate} status={filterCorrectDateStatus(date)} />
                  ) : (
                    <DateCellWithMark
                      date={date}
                      isCurrentMonth={isCurrentMonth}
                      isToday={isToday}
                      isSelectedDate={isSelectedDate}
                      isSelectedWeek={false}
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
