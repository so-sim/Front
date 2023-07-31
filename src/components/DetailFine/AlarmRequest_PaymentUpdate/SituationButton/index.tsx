import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import theme from '@/styles/Theme';
import { CheckDetailFine, SelectedEventInfo_Checked, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import { useUpdateDetailStatus } from '@/queries/Detail';
import { useParams, useSearchParams } from 'react-router-dom';

import { useParticipantList } from '@/queries/Group';
import { useEffect, useState } from 'react';
import { Situation } from '@/types/event';
import { useGroupDetail } from '@/queries/Group';
import { useSelectedContext, initialSelectData } from '@/contexts/SelectedFineContext';
import { useRequestNotification } from '@/queries/Notification/useRequestNotifaction';
import { useRecoilState } from 'recoil';
import { initialSideModalState, sideModalState } from '@/store/sideModalState';

type Props = {
  situationToChange: Situation;
  setSituationToChange: React.Dispatch<React.SetStateAction<Situation>>;
  currentSituation: Situation;
};

const SituationButton = ({ situationToChange, setSituationToChange, currentSituation }: Props) => {
  return (
    <Style.SituationContainer>
      <Style.SituationButton situationType={currentSituation}>{currentSituation}</Style.SituationButton>
      <Style.Arrow />
      {currentSituation === '확인중' ? (
        <>
          <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '완납'} onClick={() => setSituationToChange('완납')}>
            입금완료
          </Style.SituationButton>

          <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '미납'} onClick={() => setSituationToChange('미납')}>
            미납
          </Style.SituationButton>
        </>
      ) : (
        <Style.SituationButton situationType={situationToChange}>{situationToChange}</Style.SituationButton>
      )}
    </Style.SituationContainer>
  );
};

export default SituationButton;
