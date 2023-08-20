import { Button } from '@/components/@common';
import * as Style from './styles';
import MiniCalendar from '@/components/@common/MiniCalendar';

type Props = {
  onClose: () => void;
  date: string;
  onChangeDate: (date: string) => void;
};

const MobileMiniCalendar = ({ onClose, date, onChangeDate }: Props) => {
  return (
    <>
      <Style.Overlay onClick={onClose} />
      <Style.Frame>
        <MiniCalendar //
          type={date}
          setType={onChangeDate}
          setOpenDrop={onClose}
          trigger={<Button color="white">선택</Button>}
        />
      </Style.Frame>
    </>
  );
};

export default MobileMiniCalendar;
