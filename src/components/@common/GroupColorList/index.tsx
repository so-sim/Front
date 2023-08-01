import * as Style from './styles';
import { COLORS } from '@/constants/Group';
import { GroupColor } from '@/types/group';

interface Props {
  selectedColor: GroupColor;
  onChange: (value: GroupColor) => void;
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
