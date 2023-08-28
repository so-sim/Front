import { SYSTEM } from '@/assets/icons/System';
import AlarmList from './AlarmList';

import * as Style from './styles';
import AlarmInfo from './AlarmInfo';
import { useRecoilState } from 'recoil';
import { alarmInfoState, initAlarmInfoState } from '@/store/alarmInfoState';
import { useSearchParams } from 'react-router-dom';

type Props = {
  headerHeight: number;
  setShowAlarmDetail: React.Dispatch<React.SetStateAction<boolean>>;
};
const AlarmDetail = ({ headerHeight, setShowAlarmDetail }: Props) => {
  const [alarmIdList, setAlarmIdList] = useRecoilState(alarmInfoState);

  const [searchParam, setSearchParam] = useSearchParams();

  const close = () => {
    setShowAlarmDetail((prev) => !prev);

    setAlarmIdList(initAlarmInfoState);
  };
  return (
    <Style.AlarmDetailFrame $headerHeight={headerHeight}>
      <Style.Header>
        <Style.CloseIconWrapper onClick={close}>
          {SYSTEM.CLOSE_LG}
          <Style.CloseText>닫기</Style.CloseText>
        </Style.CloseIconWrapper>
      </Style.Header>

      <Style.Main>
        {!alarmIdList.alarmEventIdList.length && <AlarmList />}
        {alarmIdList.alarmEventIdList.length && <AlarmInfo />}
      </Style.Main>
    </Style.AlarmDetailFrame>
  );
};
export default AlarmDetail;
