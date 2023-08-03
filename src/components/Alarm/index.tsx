import { ALARM } from '@/assets/icons/Alarm';
import styled from '@emotion/styled';
import { useState } from 'react';
import AlarmDetail from './AlarmDetail';

import * as Style from './styles';

type Props = {
  headerHeight: number;
};

const AlarmComponent = ({ headerHeight }: Props) => {
  const [showAlarmDetail, setShowAlarmDetail] = useState(false);
  return (
    <>
      <Style.AlarmIconWrapper onClick={() => setShowAlarmDetail((prev) => !prev)}>{ALARM.ALARM}</Style.AlarmIconWrapper>
      {showAlarmDetail && <AlarmDetail headerHeight={headerHeight} setShowAlarmDetail={setShowAlarmDetail} />}
    </>
  );
};

export default AlarmComponent;
