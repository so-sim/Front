import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import Button from '@/components/@common/Button';
import * as Style from './styles';
import { useRecoilState } from 'recoil';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { DateFilter } from '@/utils/dateFilter/dateFilter';
import { customedWeek } from '@/utils/customedWeek';
import DropDown from '@/components/@common/DropDown';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { FilterMode } from '@/pages/FineBook/DetailFine';

type Props = {
  mode: FilterMode;
  setMode: Dispatch<SetStateAction<FilterMode>>;
  addModalHandler: () => void;
};

const filterButtonList: { mode: FilterMode; text: string; id: string }[] = [
  { mode: 'month', text: '월간', id: 'filter_month' },
  { mode: 'week', text: '주간', id: 'filter_week_drop' },
  { mode: 'day', text: '일간', id: 'filter_day' },
];

const DateController = ({ mode, setMode, addModalHandler }: Props) => {
  const { groupId } = useParams();
  const { data: groupData } = useGroupDetail(Number(groupId));
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [{ baseDate, week }, setSelectedDate] = useRecoilState(dateState);

  const [openWeeklyFilterDrop, setOpenWeeklyFilterDrop] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('');

  const handleWeeklyFilterDrop = () => {
    setOpenWeeklyFilterDrop(false);
  };

  const dateFilter = useMemo(() => new DateFilter(mode, week), [mode]);

  const increaseCalendarByMode = () => {
    setSelectedDate(({ baseDate }) => dateFilter.increaseDate(baseDate));
  };

  const decreaseCalendarByMode = () => {
    setSelectedDate(({ baseDate }) => dateFilter.decreaseDate(baseDate));
  };

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

  useEffect(() => {
    if (week !== null) setSelectedWeek(`${week}주`);
  }, []);

  useEffect(() => {
    if (mode !== 'week') setOpenWeeklyFilterDrop(false);
  }, [mode]);

  return (
    <Style.DateController>
      <Style.ControllerFrame>
        <Style.Block>
          <Style.Date mode={mode}>{dateFilter.getTitle(baseDate)}</Style.Date>
          <Style.ArrowBlock id="list_skip">
            <Style.ArrowWrapper onClick={decreaseCalendarByMode} id="list_skip_left" data-testid="list_skip_left">
              {ARROW.LEFT}
            </Style.ArrowWrapper>
            <Style.ArrowWrapper onClick={increaseCalendarByMode} id="list_skip_right" data-testid="list_skip_right">
              {ARROW.RIGHT}
            </Style.ArrowWrapper>
          </Style.ArrowBlock>
          <Style.TodayButton
            onClick={() => {
              setMode('day');
              setSelectedDate((prev) => ({ ...prev, baseDate: dayjs(), selectedDate: dayjs(), week: null }));
            }}
            id="today_list"
          >
            오늘
          </Style.TodayButton>
        </Style.Block>
        <Style.Block>
          <Style.FilterWrapper ref={dropDownRef}>
            {filterButtonList.map((btn) => {
              return (
                <Style.FilterButton
                  id={btn.id}
                  key={btn.id}
                  isActive={mode === btn.mode}
                  onClick={() => {
                    setOpenWeeklyFilterDrop((prev) => !prev);
                    if (mode === btn.mode) return;
                    setMode(btn.mode);
                    setSelectedDate((prev) => dateFilter.updateDateStateByMode(prev.baseDate, btn.mode));
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
            <Button color="black" width="124px" height="40px" onClick={addModalHandler} id="add_list">
              내역 추가하기
            </Button>
          )}
        </Style.Block>
      </Style.ControllerFrame>
    </Style.DateController>
  );
};

export default DateController;
