import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import Button from '@/common/Button';
import * as Style from './styles';
import { EventFilter } from '@/types/event';

interface DateControllerProps {
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
}

export const DateController: FC<DateControllerProps> = ({ setOpenAddModal }) => {
  const [filterList, setFilterList] = useState<Partial<EventFilter>>({ year: 2023 });
  const setFilter = (filter: Partial<EventFilter>) => {
    setFilterList((prev) => {
      const key = Object.keys(filter)[0];
      if (Object.keys(prev).includes(key)) {
        if (filter[key as keyof EventFilter] === prev[key as keyof EventFilter]) {
          // const { key  ,...rest} = prev
        }
      }
      // prev[Object.keys(filter)[0]]
      // if(prev[])
      return { ...prev, ...filter };
    });
  };
  return (
    <Style.DateController>
      <Style.ControllerFrame>
        <Style.Block>
          <Style.Date>1월 22일~1월 28일</Style.Date>
          <Style.ArrowBlock>
            <Style.ArrowWrapper>{ARROW.LEFT}</Style.ArrowWrapper>
            <Style.ArrowWrapper>{ARROW.RIGHT}</Style.ArrowWrapper>
          </Style.ArrowBlock>
        </Style.Block>
        <Style.Block>
          <Style.TodayButton>오늘</Style.TodayButton>
          <Style.FilterWrapper>
            <Style.FilterButton>월간</Style.FilterButton>
            <Style.FilterButton>주간</Style.FilterButton>
            <Style.FilterButton last={true}>일간</Style.FilterButton>
          </Style.FilterWrapper>
        </Style.Block>
      </Style.ControllerFrame>
      <Button color="black" width="124px" height="40px" onClick={() => setOpenAddModal(true)}>
        내역 추가하기
      </Button>
    </Style.DateController>
  );
};
