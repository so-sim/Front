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
import { FineBookModal } from '@/components/@common/Modal/FineBookModal';
import useCheckLocationState from '@/hooks/useCheckLocationState';

type Props = {
  mode: FilterMode;
  setMode: Dispatch<SetStateAction<FilterMode>>;
};

const filterButtonList: { mode: FilterMode; text: string; id: string }[] = [
  { mode: 'month', text: '월간', id: 'filter_month' },
  { mode: 'week', text: '주간', id: 'filter_week_drop' },
  { mode: 'day', text: '일간', id: 'filter_day' },
];

const DateController = ({ mode, setMode }: Props) => {
  const { groupId } = useParams();
  const { data: groupData } = useGroupDetail(Number(groupId));
  const dropDownRef = useRef<HTMLDivElement>(null);
  const initialAddModalState = useCheckLocationState();

  const [{ baseDate, week }, setSelectedDate] = useRecoilState(dateState);

  const [openAddModal, setOpenAddModal] = useState<boolean>(initialAddModalState);
  const [openWeeklyFilterDrop, setOpenWeeklyFilterDrop] = useState(false);

  const dateFilter = new DateFilter(mode, week);

  const handleDateStateWeek = (weekTitle: string) => {
    const week = Number(weekTitle[0]);
    setSelectedDate((prev) => dateFilter.goToWeek(prev, week));
  };

  const increaseCalendarByMode = () => {
    setSelectedDate(({ baseDate }) => dateFilter.increaseDate(baseDate));
  };

  const decreaseCalendarByMode = () => {
    setSelectedDate(({ baseDate }) => dateFilter.decreaseDate(baseDate));
  };

  const handleWeeklyFilterDrop = () => {
    setOpenWeeklyFilterDrop((prev) => !prev);
  };

  const handleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  const handleDateFilterMode = (buttonMode: FilterMode) => {
    handleWeeklyFilterDrop();
    if (mode === buttonMode) return;
    setMode(buttonMode);
    setSelectedDate((prev) => dateFilter.updateDateStateByMode(prev.baseDate, buttonMode));
  };

  const updateToToday = () => {
    setMode('day');
    setSelectedDate((prev) => ({ ...prev, baseDate: dayjs(), selectedDate: dayjs(), week: null }));
  };

  return (
    <>
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
            <Style.TodayButton onClick={updateToToday} id="today_list">
              오늘
            </Style.TodayButton>
          </Style.Block>
          <Style.Block>
            <Style.FilterWrapper ref={dropDownRef}>
              {filterButtonList.map((btn) => {
                return (
                  <Style.FilterButton
                    id={btn.id} // ga
                    key={btn.id}
                    isActive={mode === btn.mode}
                    onClick={() => handleDateFilterMode(btn.mode)}
                  >
                    <span>{btn.text}</span>
                    {btn.mode === 'week' && mode === 'week' && openWeeklyFilterDrop && (
                      <div style={{ position: 'relative', left: '1px' }}>
                        <DropDown
                          width={60}
                          align="center"
                          setState={handleDateStateWeek}
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
              <Button color="black" width="124px" height="40px" onClick={handleAddModal} id="add_list">
                내역 추가하기
              </Button>
            )}
          </Style.Block>
        </Style.ControllerFrame>
      </Style.DateController>
      {openAddModal && <FineBookModal modalHandler={handleAddModal} />}
    </>
  );
};

export default DateController;
