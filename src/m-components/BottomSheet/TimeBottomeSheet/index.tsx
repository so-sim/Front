import { TIME_LIST } from '@/components/@common/Modal/GroupSettingModal/AdminModal/NotifiactionForm/CommonForm';
import { convertTimeFormat } from '@/utils/convertFormat';
import BottomSheet from '..';

import * as Style from './styles';

type Props = {
  onClose: () => void;
  onChange: (value: string) => void;
};

const TimeBottomSheet = ({ onClose, onChange }: Props) => {
  const handleSelectTime = (time: string) => {
    onChange(time);
    onClose();
  };

  return (
    <BottomSheet title="팀원" onClose={onClose}>
      <Style.TimeList>
        {TIME_LIST.map((time) => {
          return (
            <Style.TimeListItem
              key={time} //
              onClick={() => handleSelectTime(time)}
            >
              {convertTimeFormat(time)}
            </Style.TimeListItem>
          );
        })}
      </Style.TimeList>
    </BottomSheet>
  );
};

export default TimeBottomSheet;
