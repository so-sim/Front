import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from '../styles';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

export type DropBoxColor = 'white' | 'gray' | 'disabled';

interface DropBoxProps<T = string> {
  type: T;
  dropDownList: { title: T }[];
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
  setType?: Dispatch<SetStateAction<T>>;
  direction?: 'left' | 'right';
}

export const CalendarDropBox = <T,>({ setType, type, dropDownList, width = 152, boxWidth = '148px', color = 'gray', direction }: DropBoxProps<T>) => {
  const [openDrop, setOpenDrop] = useState(true);
  const [value, onChange] = useState(new Date());
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

      {openDrop && <div style={{ position: 'absolute', top: '34px', left: '-2px' }}>{/* <Calendar value={value} onChange /> */}</div>}
    </Style.DropDownBox>
  );
};
