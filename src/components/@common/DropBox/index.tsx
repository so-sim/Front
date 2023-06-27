import { useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import DropDown from '@/components/@common/DropDown';
import * as Style from './styles';

export type DropBoxColor = 'white' | 'disabled';

interface Props<T> {
  type: T;
  dropDownList: { title: T; id?: string }[];
  boxWidth?: string;
  width?: number;
  color?: DropBoxColor;
  setType: (value: T) => void;
  direction?: 'left' | 'right';
  align?: 'start' | 'center';
}

const DropBox = <T,>({ align = 'start', setType, type, dropDownList, width = 152, boxWidth = '148px', color = 'white', direction }: Props<T>) => {
  const [openDrop, setOpenDrop] = useState(false);
  const isDisabled = color === 'disabled';

  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropDown = () => {
    if (isDisabled) return;
    setOpenDrop((prev) => !prev);
  };

  return (
    <Style.DropDownBox boxWidth={boxWidth} color={color} focus={openDrop} ref={dropDownRef} onClick={handleDropDown}>
      <Style.Content>
        <Style.Text boxWidth={boxWidth} isDisabled={isDisabled} isSelected={!!type} focus={openDrop}>
          {(typeof type === 'string' && type) || '선택해주세요'}
        </Style.Text>
        {!isDisabled && <Style.ArrowIcon focus={openDrop}>{openDrop ? ARROW.DOWN_LG : ARROW.DOWN_LG_NON_FOCUS}</Style.ArrowIcon>}
      </Style.Content>
      {openDrop && (
        <DropDown
          align={align} //
          list={dropDownList}
          width={width}
          setState={setType}
          top="34px"
          onClose={handleDropDown}
          direction={direction}
          dropDownRef={dropDownRef}
        />
      )}
    </Style.DropDownBox>
  );
};
export default DropBox;
