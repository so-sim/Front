import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import DropDown from '@/components/@common/DropDown';
import * as Style from './styles';

export type DropBoxColor = 'white' | 'gray' | 'disabled';

interface Props<T = string> {
  type: T;
  dropDownList: { title: T; id?: string }[];
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
  setType: Dispatch<SetStateAction<T>>;
  direction?: 'left' | 'right';
  align?: 'start' | 'center';
}

const DropBox = <T,>({ align = 'start', setType, type, dropDownList, width = 152, boxWidth = '148px', color = 'gray', direction }: Props<T>) => {
  const [openDrop, setOpenDrop] = useState(false);
  const isDisabled = color === 'disabled';

  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropDown = () => {
    if (isDisabled) return;
    setOpenDrop((prev) => !prev);
  };

  return (
    <Style.DropDownBox boxWidth={boxWidth} color={color} ref={dropDownRef} onClick={handleDropDown}>
      <Style.Content>
        <Style.Text boxWidth={boxWidth} isDisabled={isDisabled}>
          {(typeof type === 'string' && type) || '선택해주세요'}
        </Style.Text>
        {!isDisabled && <Style.ArrowIcon>{ARROW.DOWN_LG}</Style.ArrowIcon>}
      </Style.Content>
      {openDrop && (
        <DropDown align={align} list={dropDownList} width={width} setState={setType} top="34px" onClose={handleDropDown} direction={direction} dropDownRef={dropDownRef} />
      )}
    </Style.DropDownBox>
  );
};
export default DropBox;
