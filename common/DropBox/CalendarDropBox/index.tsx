import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from '../styles';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import dayjs from 'dayjs';

export type DropBoxColor = 'white' | 'gray' | 'disabled';

interface CalendarDropBoxProps {
  type: string;
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
  setType: Dispatch<SetStateAction<string>>;
  direction?: 'left' | 'right';
}

export const CalendarDropBox = <T,>({ setType, type, boxWidth = '138px', color = 'gray' }: CalendarDropBoxProps) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [value, onChange] = useState<any>(new Date());

  useEffect(() => {
    setType(dayjs(value).format('YYYY.MM.DD'));
  }, [value]);

  const isDisabled = color === 'disabled';

  return (
    <Style.DropDownBox boxWidth={boxWidth} color={color}>
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
          <Calendar value={value} onChange={onChange} />
        </div>
      )}
    </Style.DropDownBox>
  );
};
