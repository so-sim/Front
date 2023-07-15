import { ARROW } from '@/assets/icons/Arrow';
import { DropDown } from '@/components/@common';
import { dateState } from '@/store/dateState';
import { customedWeek } from '@/utils/customedWeek';
import React, { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { FilterButtonType } from '..';
import { FilterModeTest, useDateFilter } from '../hook/useDateFilter';
import PeriodSettingModal from '../PeriodSettingModal';
import * as Style from './styles';

type Props = {
  btn: FilterButtonType;
  openPeriodSettingDrop: boolean;
  setOpenPeriodSettingDrop: Dispatch<SetStateAction<boolean>>;
};

const FilterButton = ({ btn, openPeriodSettingDrop, setOpenPeriodSettingDrop }: Props) => {
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);
  const [openWeeklyFilterDrop, setOpenWeeklyFilterDrop] = useState(false);
  const { goToWeek, changeDateByButtonMode } = useDateFilter();

  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleWeeklyFilterDrop = () => {
    setOpenWeeklyFilterDrop((prev) => !prev);
  };

  const handleCustomFilterDrop = () => {
    setOpenPeriodSettingDrop((prev) => !prev);
  };

  const handleDateFilterMode = (e: MouseEvent<HTMLButtonElement>, buttonMode: FilterModeTest) => {
    if (buttonMode === 'custom') {
      setOpenWeeklyFilterDrop(false);
      handleCustomFilterDrop();
      e.stopPropagation();
      return;
    }
    handleWeeklyFilterDrop();
    setOpenPeriodSettingDrop(false);
    if (calendarDate.mode === buttonMode) return;

    changeDateByButtonMode(buttonMode);
  };

  return (
    <>
      <Style.FilterButton id={btn.id} isActive={calendarDate.mode === btn.mode} onClick={(e) => handleDateFilterMode(e, btn.mode)}>
        <Style.FlexCenter>
          <span>{btn.text}</span>
          {(btn.mode === 'week' || btn.mode === 'custom') && <Style.ArrowIcon>{ARROW.DOWN_SM}</Style.ArrowIcon>}
        </Style.FlexCenter>
        {btn.mode === 'week' && calendarDate.mode === 'week' && openWeeklyFilterDrop && (
          <Style.DropDownWrapper>
            <DropDown
              width={60}
              align="center"
              setState={goToWeek}
              list={customedWeek(calendarDate.baseDate)}
              top="7px"
              onClose={handleWeeklyFilterDrop}
              dropDownRef={dropDownRef}
            />
          </Style.DropDownWrapper>
        )}
      </Style.FilterButton>
      {btn.mode === 'custom' && openPeriodSettingDrop && <PeriodSettingModal modalHandler={handleCustomFilterDrop} />}
    </>
  );
};

export default FilterButton;
