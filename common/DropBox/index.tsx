import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import DropDown from '@/common/DropDown';
import * as Style from './styles';

export type DropBoxColor = 'white' | 'gray' | 'disabled';

interface DropBoxProps<T = string> {
  type: T;
  dropDownList: { title: T }[];
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
  setType?: Dispatch<SetStateAction<T>>;
  direction?: 'left' | 'right';
  align?: 'start' | 'center';
}

export const DropBox = <T,>({ align = 'start', setType, type, dropDownList, width = 152, boxWidth = '148px', color = 'gray', direction }: DropBoxProps<T>) => {
  const [openDrop, setOpenDrop] = useState(false);
  const isDisabled = color === 'disabled';

  return (
    <Style.DropDownBox boxWidth={boxWidth} color={color}>
      <Style.Text boxWidth={boxWidth} isDisabled={isDisabled}>
        {(typeof type === 'string' && type) || '선택해주세요'}
      </Style.Text>
      {!isDisabled && (
        <Style.ArrowIcon
          onClick={(e) => {
            if (isDisabled) return;
            setOpenDrop((prev) => !prev);
          }}
        >
          {ARROW.DOWN_LG}
        </Style.ArrowIcon>
      )}
      {openDrop && <DropDown align={align} list={dropDownList} width={width} setState={setType} top="34px" onClose={() => setOpenDrop(false)} direction={direction} />}
    </Style.DropDownBox>
  );
};
