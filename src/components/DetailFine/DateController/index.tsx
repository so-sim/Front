import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import Button from '@/components/@common/Button';
import * as Style from './styles';
import { useRecoilState } from 'recoil';

import dayjs from 'dayjs';
import { customedWeek } from '@/utils/customedWeek';
import DropDown from '@/components/@common/DropDown';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { FilterMode } from '@/pages/FineBook/DetailFine';
import useCheckLocationState from '@/hooks/useCheckLocationState';
import { GA } from '@/constants/GA';
import FineBookCreateModal from '@/components/@common/Modal/FineBookModal/FineBookCreateModal';
import { dateState } from '@/store/dateState';
import useDateController from './hook/useDateController';
import { DetailFilter } from '@/store/detailFilter';

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

  const [calendarDate, setSelectedDate] = useRecoilState(dateState);
  // const [calendarDate, setSelectedDate] = useRecoilState(dateState);

  const [openAddModal, setOpenAddModal] = useState<boolean>(initialAddModalState);
  const [openWeeklyFilterDrop, setOpenWeeklyFilterDrop] = useState(false);

  const { getTitle, goToWeek, changeDateByButtonMode, increase, decrease } = useDateController(calendarDate.mode);

  const handleWeeklyFilterDrop = () => {
    setOpenWeeklyFilterDrop((prev) => !prev);
  };

  const handleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  const handleDateFilterMode = (buttonMode: FilterMode) => {
    handleWeeklyFilterDrop();
    if (calendarDate.mode === buttonMode) return;

    changeDateByButtonMode(buttonMode);
  };

  const updateToToday = () => {
    // 여기 Type을 정해줬는데도 baseDate로 들어가있었다.. 왜 Type 체크를 안해줬을까?
    setSelectedDate((prev) => ({ ...prev, baseDate: dayjs(), startDate: dayjs(), endDate: dayjs(), mode: 'day' as FilterMode }));
  };

  useEffect(() => {
    setDetailFilter((prev) => ({ ...prev, page: 0 }));
  }, [calendarDate.mode]);

  return (
    <>
      <Style.DateController>
        <Style.ControllerFrame>
          <Style.Block>
            <Style.Date mode={calendarDate.mode}>{getTitle()}</Style.Date>
            <Style.ArrowBlock id={GA.LIST_SKIP.ALL}>
              <Style.ArrowWrapper onClick={decrease} id={GA.LIST_SKIP.LEFT} data-testid={GA.LIST_SKIP.LEFT}>
                {ARROW.LEFT}
              </Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={increase} id={GA.LIST_SKIP.RIGHT} data-testid={GA.LIST_SKIP.RIGHT}>
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
                  <Style.FilterButton id={btn.id} key={btn.id} isActive={calendarDate.mode === btn.mode} onClick={() => handleDateFilterMode(btn.mode)}>
                    <span>{btn.text}</span>
                    {btn.mode === 'week' && calendarDate.mode === 'week' && openWeeklyFilterDrop && (
                      <div style={{ position: 'relative', left: '1px' }}>
                        <DropDown
                          width={60}
                          align="center"
                          setState={goToWeek}
                          list={customedWeek(calendarDate.baseDate)}
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
