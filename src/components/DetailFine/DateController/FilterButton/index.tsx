import { ARROW } from '@/assets/icons/Arrow';
import { DropDown } from '@/components/@common';
import useCheckListState from '@/hooks/useCheckListState';
import useDropDown from '@/hooks/useDropDown';
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
};

const FilterButton = ({ btn }: Props) => {
  const { dropDownRef: periodSettingRef, setOpenDrop: setOpenPeriodSettingDrop, openDrop: openPeriodSettingDrop } = useDropDown();
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);
  const [openWeeklyFilterDrop, setOpenWeeklyFilterDrop] = useState(false);
  const { goToWeek, changeDateByButtonMode } = useDateFilter();

  const {
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

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
      setInitCheckDetailFine();
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
    <div ref={periodSettingRef}>
      <div ref={dropDownRef}>
        <Style.FilterButton
          isFirst={btn.mode === 'month'}
          isLast={btn.mode === 'custom'}
          id={btn.id}
          isActive={calendarDate.mode === btn.mode}
          onClick={(e) => handleDateFilterMode(e, btn.mode)}
        >
          <Style.FlexCenter>
            <span>{btn.text}</span>
            {btn.mode === 'custom' && <Style.ArrowIcon>{ARROW.DOWN_SM}</Style.ArrowIcon>}
            {/* {(btn.mode === 'week' || btn.mode === 'custom') && <Style.ArrowIcon>{ARROW.DOWN_SM}</Style.ArrowIcon>} */}
          </Style.FlexCenter>
          {/* {btn.mode === 'week' && calendarDate.mode === 'week' && openWeeklyFilterDrop && (
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
          )} */}
        </Style.FilterButton>
      </div>
      {btn.mode === 'custom' && openPeriodSettingDrop && <PeriodSettingModal modalHandler={handleCustomFilterDrop} />}
    </div>
  );
};

export default FilterButton;
