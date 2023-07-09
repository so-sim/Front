import MiniCalendar from '@/components/@common/MiniCalendar';
import useDropDown from '@/hooks/useDropDown';
import { Dispatch, SetStateAction } from 'react';
import { CustomPeriodType } from '..';
import * as Style from './styles';

type Props = {
  label: '시작일' | '종료일';
  date: string;
  setCustomPeriod: Dispatch<SetStateAction<CustomPeriodType>>;
};

const obj = {
  시작일: 'startDate',
  종료일: 'endDate',
};

const PeriodInput = ({ label, date, setCustomPeriod }: Props) => {
  const { dropDownRef, openDrop, setOpenDrop } = useDropDown();
  const hadleCalendarDropDown = () => {
    setOpenDrop((prev) => !prev);
  };

  const handleDateByType = (date: string) => {
    setCustomPeriod((prev) => ({ ...prev, [obj[label]]: date }));
  };

  return (
    <div ref={dropDownRef}>
      <Style.Subtitle>{label}</Style.Subtitle>
      <Style.PeriodInput onClick={hadleCalendarDropDown}>{date}</Style.PeriodInput>
      {openDrop && (
        <div style={{ position: 'absolute', top: '38px', left: '-2px', zIndex: 20 }}>
          <MiniCalendar type={date} setType={handleDateByType} setOpenDrop={setOpenDrop} />
        </div>
      )}
    </div>
  );
};

export default PeriodInput;
