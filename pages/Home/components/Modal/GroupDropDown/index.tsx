import React, { Dispatch, FC, SetStateAction } from 'react';
import { ARROW } from '../../../../../assets/icons/Arrow';
import DropDown from '../../../../../common/DropDown';
import * as Style from './styles';

interface GroupDropDownProps {
  openDrop: boolean;
  type: string;
  dropDownList: { title: string }[];
  width?: number;
  setOpenDrop: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<SetStateAction<string>>;
}

export const GroupDropDown: FC<GroupDropDownProps> = ({ openDrop, setOpenDrop, setType, type, dropDownList, width = 152 }) => {
  return (
    <Style.DropDownBox>
      <Style.Text>{type || '선택해주세요'}</Style.Text>
      <Style.ArrowIcon onClick={() => setOpenDrop((prev) => !prev)}>{ARROW.DOWN_LG}</Style.ArrowIcon>
      {openDrop && <DropDown list={dropDownList} width={width} setState={setType} top="34px" onClose={() => setOpenDrop(false)} />}
    </Style.DropDownBox>
  );
};
