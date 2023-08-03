import { SYSTEM } from '@/assets/icons/System';
import AlarmList from './AlarmList';

import * as Style from './styles';
import AlarmInfo from './AlarmInfo';

type Props = {
  headerHeight: number;
};
const AlarmDetail = ({ headerHeight }: Props) => {
  return (
    <Style.AlarmDetailFrame $headerHeight={headerHeight}>
      <Style.Header>
        <Style.CloseIconWrapper>
          {SYSTEM.CLOSE_LG}
          <span>닫기</span>
        </Style.CloseIconWrapper>
      </Style.Header>

      <Style.Main>
        {/* <AlarmList /> */}
        <AlarmInfo />
      </Style.Main>
    </Style.AlarmDetailFrame>
  );
};
export default AlarmDetail;
