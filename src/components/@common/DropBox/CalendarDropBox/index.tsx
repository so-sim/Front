import { useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from '../styles';
import MiniCalendar from '../../MiniCalendar';

export type DropBoxColor = 'white' | 'disabled';

interface CalendarDropBoxProps {
  type: string;
  setType: (value: string) => void;
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
}

export const CalendarDropBox = ({ setType, type, boxWidth = '138px', color = 'white' }: CalendarDropBoxProps) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [openDrop, setOpenDrop] = useState(false);

  const hadleCalendarDropDown = () => {
    setOpenDrop((prev) => !prev);
  };

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
    <Style.DropDownBox ref={dropDownRef} boxWidth={boxWidth} color={color} focus={openDrop}>
      <div onClick={hadleCalendarDropDown} style={{ display: 'flex', alignItems: 'center' }}>
        <Style.Text boxWidth={boxWidth} isDisabled={isDisabled} isSelected={!!type} focus={openDrop}>
          {type}
        </Style.Text>
        {!isDisabled && <Style.ArrowIcon focus={openDrop}>{openDrop ? ARROW.DOWN_LG : ARROW.DOWN_LG_NON_FOCUS}</Style.ArrowIcon>}
      </div>
      {openDrop && (
        <div style={{ position: 'absolute', top: '34px', left: '-2px' }}>
          <MiniCalendar type={type} setType={setType} setOpenDrop={setOpenDrop} />
        </div>
      )}
    </Style.DropDownBox>
  );
};
