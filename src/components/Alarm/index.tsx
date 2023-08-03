import { ALARM } from '@/assets/icons/Alarm';
import styled from '@emotion/styled';
import { useState } from 'react';
import AlarmDetail from './AlarmDetail';

type Props = {
  headerHeight: number;
};

const AlarmComponent = ({ headerHeight }: Props) => {
  const [showAlarmDetail, setShowAlarmDetail] = useState(false);
  return (
    <>
      <AlarmIconWrapper onClick={() => setShowAlarmDetail((prev) => !prev)}>{ALARM.ALARM}</AlarmIconWrapper>
      {showAlarmDetail && <AlarmDetail headerHeight={headerHeight} />}
    </>
  );
};

export default AlarmComponent;

const AlarmIconWrapper = styled.div`
  position: relative;
  &::after {
    content: '99+';

    position: absolute;
    padding: 2px 9px;
    background-color: red;
    color: white;
    border-radius: 1.25rem;
    top: -50%;
    left: 25%;
  }
`;
