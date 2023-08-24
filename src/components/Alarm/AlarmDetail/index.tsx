import { SYSTEM } from '@/assets/icons/System';
import AlarmList from './AlarmList';

import * as Style from './styles';
import AlarmInfo from './AlarmInfo';
import { useRecoilState } from 'recoil';
import { alarmInfoState } from '@/store/alarmInfoState';

type Props = {
  headerHeight: number;
  setShowAlarmDetail: React.Dispatch<React.SetStateAction<boolean>>;
};
const AlarmDetail = ({ headerHeight, setShowAlarmDetail }: Props) => {
  const [alarmIdList, setAlarmIdList] = useRecoilState(alarmInfoState);

  return (
    <Style.AlarmDetailFrame $headerHeight={headerHeight}>
      <Style.Header>
        <Style.CloseIconWrapper onClick={() => setShowAlarmDetail((prev) => !prev)}>
          {SYSTEM.CLOSE_LG}
          <Style.CloseText>닫기</Style.CloseText>
        </Style.CloseIconWrapper>
      </Style.Header>

      <Style.Main>
        {!alarmIdList.alarmEventIdList.length && <AlarmList />}
        {(alarmIdList.alarmEventIdList.length || null) && <AlarmInfo />}
      </Style.Main>
    </Style.AlarmDetailFrame>
  );
};
export default AlarmDetail;
