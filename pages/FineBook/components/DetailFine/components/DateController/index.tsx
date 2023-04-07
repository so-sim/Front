import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import Button from '@/common/Button';
import * as Style from './styles';
import { useRecoilState } from 'recoil';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { DateFilterProperty, dateFilterTitle, updateCalendarByType } from '@/pages/FineBook/utils/dateFilter';
import { FilterMode } from '../..';
import { customedWeek } from '@/utils/customedWeek';
import DropDown from '@/common/DropDown';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';

interface DateControllerProps {
  mode: FilterMode;
  setMode: Dispatch<SetStateAction<FilterMode>>;
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
  dateFilter: DateFilterProperty;
  setDateFilter: Dispatch<SetStateAction<DateFilterProperty>>;
}

export const DateController: FC<DateControllerProps> = ({ mode, setMode, setOpenAddModal, setDateFilter }) => {
  const { groupId } = useParams();
  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [{ baseDate, week }, setSelectedDate] = useRecoilState(dateState);

  const [openWeeklyFilterDrop, setOpenWeeklyFilterDrop] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('0');

  useEffect(() => {
    if (week !== null) {
      setSelectedWeek(`${week}주`);
    }
  }, []);

  useEffect(() => {
    if (mode === 'week') {
      const weekNumber = Number(selectedWeek[0]);
      const startOfMonthDay = dayjs(baseDate).set('date', 1).startOf('month').day();
      const startOfWeekDate = (weekNumber - 1) * 7 + 1 - startOfMonthDay;

      setSelectedDate((prev) => ({
        ...prev,
        week: weekNumber,
        baseDate: weekNumber === 1 ? dayjs(prev.baseDate).startOf('month') : dayjs(prev.baseDate).set('date', startOfWeekDate),
      }));
    }
  }, [selectedWeek]);

  const increaseCalendarByMode = () => {
    setSelectedDate((prev) => updateCalendarByType('increase', prev, mode));
  };

  const decreaseCalendarByMode = () => {
    setSelectedDate((prev) => updateCalendarByType('decrease', prev, mode));
  };

  const filterButtonList: { mode: FilterMode; text: string; id: string }[] = [
    { mode: 'month', text: '월간', id: 'filter_month' },
    { mode: 'week', text: '주간', id: 'filter_week_drop' },
    { mode: 'day', text: '일간', id: 'filter_day' },
  ];

  const handleWeeklyFilterDrop = () => {
    setOpenWeeklyFilterDrop(false);
  };

  useEffect(() => {
    if (mode !== 'week') {
      setOpenWeeklyFilterDrop(false);
    }
  }, [mode]);

  return (
    <Style.DateController>
      <Style.ControllerFrame>
        <Style.Block>
          <Style.Date mode={mode}>{dateFilterTitle(baseDate, mode, week)}</Style.Date>
          <Style.ArrowBlock id="list_skip">
            <Style.ArrowWrapper onClick={decreaseCalendarByMode} id="list_skip_left">
              {ARROW.LEFT}
            </Style.ArrowWrapper>
            <Style.ArrowWrapper onClick={increaseCalendarByMode} id="list_skip_right">
              {ARROW.RIGHT}
            </Style.ArrowWrapper>
          </Style.ArrowBlock>
          <Style.TodayButton onClick={() => setSelectedDate((prev) => ({ ...prev, baseDate: dayjs(), selectedDate: dayjs(), week: null }))} id="today_list">
            오늘
          </Style.TodayButton>
        </Style.Block>
        <Style.Block>
          <Style.FilterWrapper ref={dropDownRef}>
            {filterButtonList.map((btn) => {
              return (
                <Style.FilterButton
                  id={btn.id}
                  isActive={mode === btn.mode}
                  onClick={() => {
                    setOpenWeeklyFilterDrop((prev) => !prev);
                    if (mode === btn.mode) return;
                    setMode(btn.mode);
                    setSelectedDate((prev) => updateCalendarByType('none', prev, btn.mode));
                  }}
                >
                  <span>{btn.text}</span>
                  {btn.mode === 'week' && mode === 'week' && openWeeklyFilterDrop && (
                    <div style={{ position: 'relative', left: '1px' }}>
                      <DropDown
                        width={60}
                        align="center"
                        setState={setSelectedWeek}
                        list={customedWeek(baseDate)}
                        top="7px"
                        onClose={handleWeeklyFilterDrop}
                        dropDownRef={dropDownRef}
                      />
                    </div>
                  )}
                </Style.FilterButton>
              );
            })}
          </Style.FilterWrapper>
          {groupData?.content.isAdmin && (
            <Button color="black" width="124px" height="40px" onClick={() => setOpenAddModal(true)} id="add_list">
              내역 추가하기
            </Button>
          )}
        </Style.Block>
      </Style.ControllerFrame>
    </Style.DateController>
  );
};
