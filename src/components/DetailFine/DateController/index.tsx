import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import Button from '@/components/@common/Button';
import * as Style from './styles';
import { useRecoilState } from 'recoil';

import dayjs from 'dayjs';
import { DateFilter, DetailFilter } from '@/utils/dateFilter/dateFilter';
import { customedWeek } from '@/utils/customedWeek';
import DropDown from '@/components/@common/DropDown';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { FilterMode } from '@/pages/FineBook/DetailFine';
import useCheckLocationState from '@/hooks/useCheckLocationState';
import { GA } from '@/constants/GA';
import FineBookCreateModal from '@/components/@common/Modal/FineBookModal/FineBookCreateModal';
import { dateStateTest } from '@/store/dateStateTest';

export const FILTER_BUTTON_LIST: { mode: FilterMode; text: string; id: string }[] = [
  { mode: 'month', text: '월간', id: GA.FILTER.MONTH },
  { mode: 'week', text: '주간', id: GA.FILTER.WEEK_DROP },
  { mode: 'day', text: '일간', id: GA.FILTER.DAY },
];

type Props = {
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
};

const DateController = ({ setDetailFilter }: Props) => {
  const { groupId } = useParams();
  const { data: groupData } = useGroupDetail(Number(groupId));
  const dropDownRef = useRef<HTMLDivElement>(null);
  const initialAddModalState = useCheckLocationState();

  const [calendarDateTest, setSelectedDateTest] = useRecoilState(dateStateTest);
  // const [calendarDate, setSelectedDate] = useRecoilState(dateState);
  const [mode, setMode] = useState<FilterMode>('day');
  const [openAddModal, setOpenAddModal] = useState<boolean>(initialAddModalState);
  const [openWeeklyFilterDrop, setOpenWeeklyFilterDrop] = useState(false);

  // const increaseCalendarByMode = () => {
  //   setSelectedDate(({ baseDate }) => dateFilter.increaseDate(baseDate));
  // };

  // const decreaseCalendarByMode = () => {
  //   setSelectedDate(({ baseDate }) => dateFilter.decreaseDate(baseDate));
  // };

  const handleWeeklyFilterDrop = () => {
    setOpenWeeklyFilterDrop((prev) => !prev);
  };

  const handleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  // const handleDateFilterMode = (buttonMode: FilterMode) => {
  //   handleWeeklyFilterDrop();
  //   if (mode === buttonMode) return;
  //   setMode(buttonMode);
  //   setSelectedDate((prev) => dateFilter.updateDateStateByMode(prev.baseDate, buttonMode));
  // };

  const updateToToday = () => {
    setMode('day');
    setSelectedDateTest((prev) => ({ ...prev, baseDate: dayjs(), startDate: dayjs(), endDate: dayjs() }));
  };

  // useEffect(() => {
  //   setMode(() => dateFilter.decideMode(calendarDate));
  //   setDetailFilter((prev) => ({ ...dateFilter.update(prev, calendarDate), page: 0 }));
  // }, [calendarDate, mode]);

  return (
    <>
      <Style.DateController>
        <Style.ControllerFrame>
          <Style.Block>
            <Style.Date mode={mode}>{dateFilter.getTitle(calendarDateTest.baseDateTest)}</Style.Date>
            <Style.ArrowBlock id={GA.LIST_SKIP.ALL}>
              <Style.ArrowWrapper onClick={decreaseCalendarByMode} id={GA.LIST_SKIP.LEFT} data-testid={GA.LIST_SKIP.LEFT}>
                {ARROW.LEFT}
              </Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={increaseCalendarByMode} id={GA.LIST_SKIP.RIGHT} data-testid={GA.LIST_SKIP.RIGHT}>
                {ARROW.RIGHT}
              </Style.ArrowWrapper>
            </Style.ArrowBlock>
            <Style.TodayButton onClick={updateToToday} id={GA.TODAY_LIST}>
              오늘
            </Style.TodayButton>
          </Style.Block>
          <Style.Block>
            <Style.FilterWrapper ref={dropDownRef}>
              {FILTER_BUTTON_LIST.map((btn) => {
                return (
                  <Style.FilterButton id={btn.id} key={btn.id} isActive={mode === btn.mode} onClick={() => handleDateFilterMode(btn.mode)}>
                    <span>{btn.text}</span>
                    {btn.mode === 'week' && mode === 'week' && openWeeklyFilterDrop && (
                      <div style={{ position: 'relative', left: '1px' }}>
                        <DropDown
                          width={60}
                          align="center"
                          setState={goToWeek}
                          list={customedWeek(calendarDateTest.baseDateTest)}
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
      {openAddModal && <FineBookCreateModal modalHandler={handleAddModal} />}
    </>
  );
};

export default DateController;
