import SingleCheckedFineList from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SingleCheckedFineList';
import SituationButton from '@/components/DetailFine/AlarmRequest_PaymentUpdate/SituationButton';
import { alarmInfoState } from '@/store/alarmInfoState';
import { Situation } from '@/types/event';

import { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as Style from './styles';

const AlarmInfo = ({}) => {
  const [situationToChange, setSituationToChange] = useState<Situation>('완납');

  const [alarmInfo, setAlarmInfo] = useRecoilState(alarmInfoState);
  return (
    <>
      <Style.Title>나의 내역 확인하기</Style.Title>
      {/* 해당 Alarm Info가 나의 닉네임과 같다면 */}
      <Style.ProfileWrapper>
        <p>아이콘</p>
        <Style.ProfimeText>{'팀원'}</Style.ProfimeText>
      </Style.ProfileWrapper>

      <Style.Description>변경 시, {'isAdmin'}에게 알림이 갑니다.</Style.Description>
      <Style.SubTitle>선택된 모든 내역을 ~~ 으로 변경하시겠습니까?</Style.SubTitle>
      <SituationButton situationToChange={situationToChange} setSituationToChange={setSituationToChange} currentSituation={'미납'} />

      {/* 
      <SingleCheckedFineList />
        백엔드 api 형식이 확실히 나오면 컴포넌트를 재사용할 수 있을 거 같다(재사용 가능하도록 변경해야함)
      */}
    </>
  );
};

export default AlarmInfo;
