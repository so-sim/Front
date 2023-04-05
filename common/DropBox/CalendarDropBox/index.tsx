import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from '../styles';
import MiniCalendar from './MiniCalendar';

export type DropBoxColor = 'white' | 'gray' | 'disabled';

interface CalendarDropBoxProps {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
  direction?: 'left' | 'right';
}

export const CalendarDropBox = ({ setType, type, boxWidth = '138px', color = 'gray' }: CalendarDropBoxProps) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [openDrop, setOpenDrop] = useState(false);

  const isDisabled = color === 'disabled';

  useEffect(() => {
    const onClickOutSide = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setOpenDrop(false);
      }
    };
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, []);

  return (
    <Style.DropDownBox ref={dropDownRef} boxWidth={boxWidth} color={color}>
      <Style.Text boxWidth={boxWidth} isDisabled={isDisabled}>
        {(typeof type === 'string' && type) || '선택해주세요'}
      </Style.Text>
      {!isDisabled && (
        <Style.ArrowIcon
          onClick={() => {
            setOpenDrop((prev) => !prev);
          }}
        >
          {ARROW.DOWN_LG}
        </Style.ArrowIcon>
      )}

      {openDrop && (
        <div style={{ position: 'absolute', top: '34px', left: '-2px' }}>
          <MiniCalendar type={type} setType={setType} setOpenDrop={setOpenDrop} />
        </div>
      )}
    </Style.DropDownBox>
  );
};
