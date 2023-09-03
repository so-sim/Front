import { useGetMonthStatus } from '@/queries/Detail/useGetMonthStatus';
import { MonthStatus } from '@/types/event';
import { ServerResponse } from '@/types/serverResponse';
import { handleDate } from '@/utils/handleDate';
import dayjs, { Dayjs } from 'dayjs';
import { PayMentTypeCountMap } from '@/types/event';
import { dateState } from '@/store/dateState';
import { useRecoilState } from 'recoil';
import createCalendar from '@/utils/createCalendar';

type CalendarStatusHook = {
  monthList: dayjs.Dayjs[][];
  filterCorrectDateStatus: (date: Dayjs) => PayMentTypeCountMap | undefined;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
};

const useCalendarStatus = (calendarDate: dayjs.Dayjs, groupId: string | undefined): CalendarStatusHook => {
  const today = dayjs();

  const [{ baseDate, startDate, endDate, mode }, setDateTestObj] = useRecoilState(dateState);

  const { dateToFormatting, getMonth, getDate, dateToUnixTime } = handleDate;

  const monthList = createCalendar(dayjs(calendarDate), true);

  const startDateOfMonth = dateToFormatting(dayjs(calendarDate).startOf('month'));
  const endDateOfMonth = dateToFormatting(dayjs(calendarDate).endOf('month'));

  const { data: status } = useGetMonthStatus(groupId, startDateOfMonth, endDateOfMonth);

  const filterCorrectDateStatus = (date: Dayjs) => {
    const hasStatusOfDay = (status?.content.statusOfDay ?? {}).hasOwnProperty(getDate(date));

    if (hasStatusOfDay) return status?.content.statusOfDay[getDate(date)];
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.month() === getMonth(calendarDate);
  };

  const isToday = (date: Dayjs) => {
    return dateToFormatting(date) === dateToFormatting(today);
  };

  const isSelectedDate = (date: Dayjs) => {
    if (mode !== 'day') return false;
    return dateToFormatting(startDate) === dateToFormatting(date);
  };

  return {
    monthList,
    filterCorrectDateStatus,
    isCurrentMonth,
    isToday,
    isSelectedDate,
  };
};

export default useCalendarStatus;
