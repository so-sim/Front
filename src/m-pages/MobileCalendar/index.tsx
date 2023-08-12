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
    <Style.Container>
      <MobileLayout location="GROUP">
        {/* <MobileCalendarComponent /> */}
        <MobileDetailFine />
      </MobileLayout>
    </Style.Container>
  );
};

export default MobileCalendar;
