import { TIME_LIST } from '@/components/@common/Modal/GroupSettingModal/AdminModal/NotifiactionForm/CommonForm';
import { convertTimeFormat } from '@/utils/convertFormat';
import { padStart } from '@/utils/padStart';
import dayjs from 'dayjs';
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

  const TestArray = [`${padStart(dayjs().hour())}:${padStart(dayjs().minute() + 1)}`, ...TIME_LIST];

  return (
    <BottomSheet title="알림 시간" onClose={onClose}>
      <Style.TimeList>
        {TestArray.map((time) => {
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
