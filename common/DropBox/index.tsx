import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import DropDown from '@/common/DropDown';
import * as Style from './styles';

export type DropBoxColor = 'white' | 'gray' | 'disabled';

interface DropBoxProps {
  type: string;
  dropDownList: { title: string }[];
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
  setType: Dispatch<SetStateAction<string>>;
}

export const DropBox: FC<DropBoxProps> = ({ setType, type, dropDownList, width = 152, boxWidth = '148px', color = 'gray' }) => {
  const [openDrop, setOpenDrop] = useState(false);

  return (
    <Style.DropDownBox boxWidth={boxWidth} color={color}>
      <Style.Text boxWidth={boxWidth}>{type || '선택해주세요'}</Style.Text>
      <Style.ArrowIcon
        onClick={() => {
          if (color === 'disabled') return;
          setOpenDrop((prev) => !prev);
        }}
      >
        {ARROW.DOWN_LG}
      </Style.ArrowIcon>
      {openDrop && <DropDown list={dropDownList} width={width} setState={setType} top="34px" onClose={() => setOpenDrop(false)} />}
    </Style.DropDownBox>
  );
};
