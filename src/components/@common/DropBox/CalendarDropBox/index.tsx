import { ARROW } from '@/assets/icons/Arrow';
import * as Style from '../styles';
import MiniCalendar from '../../MiniCalendar';
import useDropDown from '@/hooks/useDropDown';

export type DropBoxColor = 'white' | 'disabled';

interface CalendarDropBoxProps {
  type: string;
  setType: (value: string) => void;
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
}

export const CalendarDropBox = ({ setType, type, boxWidth = '138px', color = 'white' }: CalendarDropBoxProps) => {
  const { dropDownRef, openDrop, setOpenDrop } = useDropDown();

  const hadleCalendarDropDown = () => {
    setOpenDrop((prev) => !prev);
  };

  const isDisabled = color === 'disabled';

  return (
    <Style.DropDownBox ref={dropDownRef} boxWidth={boxWidth} color={color} focus={openDrop} onClick={hadleCalendarDropDown}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Style.Text boxWidth={boxWidth} isDisabled={isDisabled} isSelected={!!type} focus={openDrop}>
          {type}
        </Style.Text>
        {!isDisabled && <Style.ArrowIcon focus={openDrop}>{openDrop ? ARROW.DOWN_LG : ARROW.DOWN_LG_NON_FOCUS}</Style.ArrowIcon>}
      </div>
      {openDrop && (
        <div style={{ position: 'absolute', top: '38px', left: '-2px', zIndex: 20 }} onClick={(e) => e.stopPropagation()}>
          <MiniCalendar type={type} setType={setType} setOpenDrop={setOpenDrop} />
        </div>
      )}
    </Style.DropDownBox>
  );
};
