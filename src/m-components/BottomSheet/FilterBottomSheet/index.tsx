import { Dispatch, SetStateAction, useState } from 'react';
import BottomSheet from '..';
import * as Style from './styles';
import { weekList } from '@/utils/customedWeek';
import { FilterModeTest, useDateFilter } from '@/components/DetailFine/DateController/hook/useDateFilter';
import { dateState } from '@/store/dateState';
import { useRecoilState } from 'recoil';
import { Situation } from '@/types/event';
import { DetailFilter } from '@/store/detailFilter';
import dayjs from 'dayjs';
import { SYSTEM } from '@/assets/icons/System';
import MiniCalendar from '@/components/@common/MiniCalendar';

const dateFilterModeList = [
  { mode: 'month', text: '월간' },
  { mode: 'week', text: '주간' },
  { mode: 'day', text: '일간' },
  { mode: 'custom', text: '상세' },
];

const situationFilterList = [
  { value: '미납', text: '미납' },
  { value: '완납', text: '완납' },
  { value: '확인중', text: '확인필요' },
];

type Props = {
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
};

const FilterBottomSheet = ({ detailFilter, setDetailFilter }: Props) => {
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);
  const { goToWeek, changeDateByButtonMode, changeDateByCustomMode } = useDateFilter();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateType, setDateType] = useState<'START_DATE' | 'END_DATE' | ''>('');

  const handleDateFilterMode = (buttonMode: FilterModeTest) => {
    if (calendarDate.mode === buttonMode) return;
    if (buttonMode === 'custom') {
      const today = dayjs();
      return changeDateByCustomMode({ endDate: today });
    }
    changeDateByButtonMode(buttonMode);
  };

  const updateSituationFilter = (situation: Situation) => {
    const isSameSituationFilter = detailFilter.situation === situation;
    setDetailFilter((prev) => ({ ...prev, situation: isSameSituationFilter ? '' : situation }));
  };

  const handleDate = (date: string) => {
    if (dateType === 'START_DATE') {
      return setCalendarDate((prev) => ({ ...prev, startDate: dayjs(date) }));
    }
    if (dateType === 'END_DATE') {
      return setCalendarDate((prev) => ({ ...prev, endDate: dayjs(date) }));
    }
  };

  const isWeekMode = calendarDate.mode === 'week';
  const isCustomMode = calendarDate.mode === 'custom';

  return (
    <>
      <BottomSheet title="필터" left={SYSTEM.INITIALIZATION}>
        <div>
          <Style.Title>기간</Style.Title>
          <Style.Row>
            {dateFilterModeList.map(({ mode, text }) => {
              return (
                <Style.FilterButton
                  key={mode}
                  isSelected={mode === calendarDate.mode}
                  onClick={() => {
                    handleDateFilterMode(mode as FilterModeTest);
                  }}
                >
                  {text}
                </Style.FilterButton>
              );
            })}
          </Style.Row>
          <Style.SubRow>
            {isWeekMode &&
              weekList.map((value, week) => {
                return (
                  <Style.WeekButton key={week} isSelected={week === 0} onClick={() => goToWeek(value)}>
                    {value}
                  </Style.WeekButton>
                );
              })}
            {isCustomMode && (
              <>
                <Style.CustomDateBox
                  onClick={() => {
                    setDateType('START_DATE');
                    setOpenCalendar(true);
                  }}
                >
                  <Style.CustomTitle>시작일</Style.CustomTitle>
                  <Style.DateBox>{dayjs(calendarDate.startDate).format('YYYY.MM.DD')}</Style.DateBox>
                </Style.CustomDateBox>
                <div>-</div>
                <Style.CustomDateBox
                  onClick={() => {
                    setDateType('END_DATE');
                    setOpenCalendar(true);
                  }}
                >
                  <Style.CustomTitle>종료일</Style.CustomTitle>
                  <Style.DateBox>{dayjs(calendarDate.endDate).format('YYYY.MM.DD')}</Style.DateBox>
                </Style.CustomDateBox>
              </>
            )}
          </Style.SubRow>
        </div>
        <div>
          <Style.Title>납부여부</Style.Title>
          <Style.Row>
            {situationFilterList.map(({ value, text }) => {
              return (
                <Style.FilterButton //
                  isSelected={value === detailFilter.situation}
                  onClick={() => updateSituationFilter(value as Situation)}
                >
                  {text}
                </Style.FilterButton>
              );
            })}
          </Style.Row>
        </div>
        <div style={{ height: '106px' }} />
      </BottomSheet>
      {Boolean(dateType) && openCalendar && (
        <div style={{ position: 'fixed', top: 0, zIndex: '150' }}>
          <MiniCalendar //
            type={dayjs(calendarDate.startDate).format('YYYY.MM.DD')}
            setType={handleDate}
            setOpenDrop={setOpenCalendar}
          />
        </div>
      )}
    </>
  );
};

export default FilterBottomSheet;
