import { Button } from '@/components/@common';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { FilterModeTest } from '../hook/useDateFilter';
import PeriodInput from './PeriodInput';
import * as Style from './styles';

export type CustomPeriodType = {
  startDate: string;
  endDate: string;
  mode: FilterModeTest;
};

type Props = {
  modalHandler: () => void;
};

const PeriodSettingModal = forwardRef(({ modalHandler }: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);
  /**
   * 상세 기간 필터링에 사용되는 startDate, endDate, mode
   * "조회" 버튼을 눌렀을 때 필터링이 적용되어야 함 (누르기 전에는 기존의 필터링 유지)
   */
  const [customPeriod, setCustomPeriod] = useState<CustomPeriodType>({
    startDate: dayjs(calendarDate.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(calendarDate.endDate).format('YYYY-MM-DD'),
    mode: 'custom',
  });

  const handleCustomPeriod = () => {
    setCalendarDate((prev) => ({
      ...prev, //
      startDate: dayjs(customPeriod.startDate),
      endDate: dayjs(customPeriod.endDate),
      mode: 'custom',
    }));
    modalHandler();
  };

  useEffect(() => {
    setCustomPeriod({
      startDate: dayjs(customPeriod.startDate).format('YYYY-MM-DD'), //
      endDate: dayjs(customPeriod.endDate).format('YYYY-MM-DD'),
      mode: 'custom',
    });
  }, [calendarDate]);

  return (
    <Style.Frame ref={ref}>
      <Style.Title>상세 기간 선택</Style.Title>
      <Style.PeriodInputRow>
        <PeriodInput label="시작일" date={customPeriod.startDate} setCustomPeriod={setCustomPeriod} />
        <PeriodInput label="종료일" date={customPeriod.endDate} setCustomPeriod={setCustomPeriod} />
      </Style.PeriodInputRow>
      <Style.ButtonRow>
        <Button color="white" onClick={handleCustomPeriod}>
          조회
        </Button>
      </Style.ButtonRow>
    </Style.Frame>
  );
});

export default PeriodSettingModal;
