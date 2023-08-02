import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import Button from '@/components/@common/Button';
import * as Style from './styles';
import { useRecoilState } from 'recoil';

import dayjs from 'dayjs';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import useCheckLocationState from '@/hooks/useCheckLocationState';
import { GA } from '@/constants/GA';
import FineBookCreateModal from '@/components/@common/Modal/FineBookModal/FineBookCreateModal';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import { FilterModeTest, useDateFilter } from './hook/useDateFilter';
import useDropDown from '@/hooks/useDropDown';
import FilterButton from './FilterButton';

export type FilterButtonType = { mode: FilterModeTest; text: string; id?: string };

export const FILTER_BUTTON_LIST: FilterButtonType[] = [
  { mode: 'month', text: '월간', id: GA.FILTER.MONTH },
  { mode: 'week', text: '주간', id: GA.FILTER.WEEK_DROP },
  { mode: 'day', text: '일간', id: GA.FILTER.DAY },
  { mode: 'custom', text: '상세' },
];

type Props = {
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
};

const DateController = ({ setDetailFilter }: Props) => {
  const { groupId } = useParams();
  const { data: group } = useGroupDetail(Number(groupId));

  const initialAddModalState = useCheckLocationState();

  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  const [openAddModal, setOpenAddModal] = useState<boolean>(initialAddModalState);

  const { getTitle, increaseDate, decreaseDate } = useDateFilter();

  const handleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  const updateToToday = () => {
    // 여기 Type을 정해줬는데도 baseDate로 들어가있었다.. 왜 Type 체크를 안해줬을까?
    setCalendarDate((prev) => ({ ...prev, baseDate: dayjs(), startDate: dayjs(), endDate: dayjs(), mode: 'day' }));
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
              <Style.ArrowWrapper onClick={decreaseDate} id={GA.LIST_SKIP.LEFT} data-testid={GA.LIST_SKIP.LEFT}>
                {ARROW.LEFT}
              </Style.ArrowWrapper>
              <Style.ArrowWrapper onClick={increaseDate} id={GA.LIST_SKIP.RIGHT} data-testid={GA.LIST_SKIP.RIGHT}>
                {ARROW.RIGHT}
              </Style.ArrowWrapper>
            </Style.ArrowBlock>
            <Style.TodayButton onClick={updateToToday} id={GA.TODAY_LIST}>
              오늘
            </Style.TodayButton>
            <Style.FilterWrapper>
              {FILTER_BUTTON_LIST.map((filterButton) => (
                <FilterButton
                  key={filterButton.mode}
                  btn={filterButton}
                  // 여기를 외부에서 넣어주는 이유는 위에 있는 div ref={periodSettingRef} 이게 없으면
                  // periodSettingModal이 켜져있는 상태에서 상세 필터 버튼을 누르면 꺼졌다가 다시 켜집니다 (버블링)
                />
              ))}
            </Style.FilterWrapper>
          </Style.Block>
          <Style.Block>
            {group?.content.isAdmin && (
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
