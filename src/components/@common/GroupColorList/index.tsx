import * as Style from './styles';
import { Dispatch, SetStateAction } from 'react';
import { COLORS } from '@/constants/Group';
import { GroupColor } from '@/types/group';

interface Props {
  selectedColor: GroupColor;
  onChange: Dispatch<SetStateAction<GroupColor>>;
}

export const GroupColorList = ({ selectedColor, onChange }: Props) => {
  return (
    <Style.GroupColorList>
      {COLORS.map((color) => {
        return (
          <Style.SelectedButton select={selectedColor === color} key={color}>
            <Style.ColorButton color={color} onClick={() => onChange(color)} />
          </Style.SelectedButton>
        );
      })}
    </Style.GroupColorList>
  );
};
