import { SYSTEM } from '@/assets/icons/System';
import AlarmList from './AlarmList';

import * as Style from './styles';
import AlarmInfo from './AlarmInfo';
import { useRecoilState } from 'recoil';
import { alarmInfoState, initAlarmInfoState } from '@/store/alarmInfoState';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { notificationModalState } from '@/store/notificationModalState';

type Props = {
  headerHeight: number;
  setShowAlarmDetail: React.Dispatch<React.SetStateAction<boolean>>;
};
const AlarmDetail = ({ headerHeight, setShowAlarmDetail }: Props) => {
  const [alarmIdList, setAlarmIdList] = useRecoilState(alarmInfoState);

  const [showNotification, setShowNotification] = useRecoilState(notificationModalState);

  const close = () => {
    setShowAlarmDetail((prev) => !prev);
  };
  return (
    <>
      <Style.AlarmDetailFrame $headerHeight={headerHeight}>
        <Style.Header>
          <Style.CloseIconWrapper onClick={close}>
            {SYSTEM.CLOSE_LG}
            <Style.CloseText>닫기</Style.CloseText>
          </Style.CloseIconWrapper>
        </Style.Header>

        {/* 여기서 Trigger를 state하나 지정해서 List 에서 Card 누르면 Info로 가는 state를 만드는게 나을듯 */}
        <Style.Main>
          {!alarmIdList.alarmEventIdList.length && <AlarmList headerHeight={headerHeight} />}
          {(alarmIdList.alarmEventIdList.length || null) && <AlarmInfo />}
        </Style.Main>
      </Style.AlarmDetailFrame>
      {showNotification && <Style.BackDrop $headerHeight={headerHeight} onClick={() => setShowNotification(false)} />}
    </>
  );
};
export default AlarmDetail;
