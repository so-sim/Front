import { SYSTEM } from '@/assets/icons/System';
import AlarmList from './AlarmList';

import * as Style from './styles';
import AlarmInfo from './AlarmInfo';

type Props = {
  headerHeight: number;
  setShowAlarmDetail: React.Dispatch<React.SetStateAction<boolean>>;
};
const AlarmDetail = ({ headerHeight, setShowAlarmDetail }: Props) => {
  return (
    <Style.AlarmDetailFrame $headerHeight={headerHeight}>
      <Style.Header>
        <Style.CloseIconWrapper onClick={() => setShowAlarmDetail((prev) => !prev)}>
          {SYSTEM.CLOSE_LG}
          <Style.CloseText>닫기</Style.CloseText>
        </Style.CloseIconWrapper>
      </Style.Header>

      <Style.Main>
        <AlarmList />
        <AlarmInfo />
      </Style.Main>
    </Style.AlarmDetailFrame>
  );
};
export default AlarmDetail;
