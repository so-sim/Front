import { Button } from '@/components/@common';
import * as Style from './styles';
import MiniCalendar from '@/components/@common/MiniCalendar';

type Props = {
  onClose: () => void;
  date: string;
  onChangeDate: (date: string) => void;
  isInvalidDate?: (date: string) => boolean;
};

const MobileMiniCalendar = ({ onClose, date, onChangeDate, isInvalidDate }: Props) => {
  return (
    <>
      <Style.Overlay onClick={onClose} />
      <Style.Frame>
        <MiniCalendar //
          type={date}
          setType={onChangeDate}
          setOpenDrop={onClose}
          isInvalidate={isInvalidDate}
          trigger={<Button color="white">선택</Button>}
        />
      </Style.Frame>
    </>
  );
};

export default MobileMiniCalendar;
