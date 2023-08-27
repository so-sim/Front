import { Button } from '@/components/@common';
import MiniCalendar from '@/components/@common/MiniCalendar';
import useDropDown from '@/hooks/useDropDown';
import { dateToUnixTime } from '@/utils/handleDate';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { CustomPeriodType } from '..';
import * as Style from './styles';

type Props = {
  label: '시작일' | '종료일';
  date: string;
  setCustomPeriod: Dispatch<SetStateAction<CustomPeriodType>>;
  isInvalidDate: (date: string) => boolean;
};

const obj = {
  시작일: 'startDate',
  종료일: 'endDate',
};

const PeriodInput = ({ label, date, setCustomPeriod, isInvalidDate }: Props) => {
  const { dropDownRef, openDrop, setOpenDrop } = useDropDown();
  const hadleCalendarDropDown = () => {
    setOpenDrop((prev) => !prev);
  };

  const handleDateByType = (date: string) => {
    setCustomPeriod((prev) => ({ ...prev, [obj[label]]: date }));
  };

  const frame: {} = label === '시작일' ? { position: 'absolute', top: '56px', left: '0px', zIndex: 20 } : { position: 'absolute', top: '56px', right: '0px', zIndex: 20 };

  return (
    <div ref={dropDownRef} style={{ position: 'relative' }}>
      <Style.Subtitle>{label}</Style.Subtitle>
      <Style.PeriodInput onClick={hadleCalendarDropDown}>{date}</Style.PeriodInput>
      {openDrop && (
        <div style={frame}>
          <MiniCalendar //
            type={date}
            setType={handleDateByType}
            setOpenDrop={setOpenDrop}
            trigger={<Button color="white">선택</Button>}
            isInvalidate={isInvalidDate}
          />
        </div>
      )}
    </div>
  );
};

export default PeriodInput;
