import { GA } from '@/constants/GA';
import useCalendarStatus from '@/hooks/Calendar/useCalendarStatus';
import useCalendarState from '@/hooks/Calendar/useCalendarState';
import { useGetMonthStatus } from '@/queries/Detail/useGetMonthStatus';
import { useGroupDetail, useNotificationInfo } from '@/queries/Group';
import { dateState } from '@/store/dateState';
import createCalendar from '@/utils/createCalendar';
import { handleDate } from '@/utils/handleDate';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ARROW } from '../../../assets/icons/Arrow';
import Button from '../Button';
import FineBookCreateModal from '../Modal/FineBookModal/FineBookCreateModal';
import DateCellWithMark from './DateCellWithMark';
import DateCellWithTag from './DateCellWithTag';

import * as Style from './styles';
import useNotificationForm from '@/hooks/Group/useNotificationForm';
import { AdminModal } from '../Modal/GroupSettingModal/AdminModal';
import { SYSTEM } from '@/assets/icons/System';
import { Tooltip } from '../Tooltip';
import CalendarTooltip from '../Tooltip/Calendar';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalnedrProps {
  cellType: 'Mark' | 'Tag';
}

const Calendar: FC<CalnedrProps> = ({ cellType }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const [showCreateDetailModal, setShowCreateDetailModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [{ baseDate, startDate, endDate, mode }, setDateTestObj] = useRecoilState(dateState);

  const { calendarDate, setCalendarDate, increaseMonth, decreaseMonth } = useCalendarState();
  const { data: notificationInfo } = useNotificationInfo(Number(groupId));
  const { monthList, filterCorrectDateStatus, isCurrentMonth, isToday, isSelectedDate } = useCalendarStatus(calendarDate, groupId);

  const { getNotificationFormAction } = useNotificationForm();
  const { getOneLineNotificationDescription } = getNotificationFormAction();

  const { dateToFormatting, dateToUnixTime } = handleDate;

  const handleShowCreateDetailModal = () => {
    setShowCreateDetailModal((prev) => !prev);
  };

  const handleShowAdminModal = () => {
    if (isAdmin) {
      setShowAdminModal((prev) => !prev);
    }
  };

  const isSelectedPeriod = (date: Dayjs) => {
    return dateToUnixTime(startDate) <= dateToUnixTime(date) && dateToUnixTime(endDate) >= dateToUnixTime(date);
  };

  const goDetail = (date: Dayjs) => {
    setDateTestObj({
      baseDate: date,
      startDate: date,
      endDate: date,
      mode: 'day',
    });
    navigate(`/group/${groupId}/book/detail`);
  };

  useLayoutEffect(() => {
    setCalendarDate(baseDate);
  }, [baseDate, startDate, endDate]);

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
            {cellType === 'Tag' && (
              <Style.NotificationDescription onClick={handleShowAdminModal} id={GA.NAVIGATION.GROUP.ALARM}>
                <span>벌금일정</span>
                <div>{getOneLineNotificationDescription(notificationInfo?.content)}</div>
              </Style.NotificationDescription>
            )}
          </div>
          <Style.RightItem>
            {cellType === 'Tag' && isAdmin && (
              <Button width="124px" height="40px" color="black" onClick={handleShowCreateDetailModal} id={GA.ADD_LIST.BUTTON}>
                내역 추가하기
              </Button>
            )}
            {cellType === 'Tag' && (
              <Tooltip
                title="캘린더에서 날짜별 벌금 납부 현황을 확인해보세요!"
                contents={CalendarTooltip}
                width={480}
                location="BOTTOM"
                top="40px"
                left="-456px"
                messageBox={{ left: '459px', top: '-8px' }}
                trigger={
                  <span style={{ cursor: 'pointer' }} id={GA.TOOLTIP.PAYMENT_OVERVIEW}>
                    {SYSTEM.TOOLTIP_INFO}
                  </span>
                }
              />
            )}
          </Style.RightItem>
        </Style.Header>
        <Style.WeekDate>
          {WEEKDATE.map((date) => (
            <div key={date}>{date}</div>
          ))}
        </Style.WeekDate>
        <Style.CalendarContainer length={monthList.length} mini={cellType === 'Mark'} id={GA.CALENDAR_SKIP.DATE}>
          {monthList.map((weeks, idx) => (
            <Style.WeekWrap key={idx} cellType={cellType}>
              {weeks.map((date) => (
                <div key={dateToFormatting(date)} onClick={() => goDetail(date)}>
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
      {showAdminModal && <AdminModal modalHandler={handleShowAdminModal} defaultValue="ALARM" />}
      {showCreateDetailModal && <FineBookCreateModal modalHandler={handleShowCreateDetailModal} />}
    </>
  );
};

export default Calendar;
