import * as Style from './styles';

import { Situation } from '@/types/event';

type Props = {
  situationToChange: Situation;
  setSituationToChange: React.Dispatch<React.SetStateAction<Situation>>;
  currentSituation: Situation;
  isAbleChange?: boolean;
};

const SITUATION_STATUS_FORMAT = {
  미납: '납부 전',
  확인중: '승인대기',
  완납: '납부완료',
};

const SituationButton = ({ situationToChange, setSituationToChange, currentSituation, isAbleChange = true }: Props) => {
  return (
    <Style.SituationContainer>
      <Style.SituationButton situationType={currentSituation}>{SITUATION_STATUS_FORMAT[currentSituation]}</Style.SituationButton>
      <Style.Arrow />
      {/* 총무가 확인 중 상태를 Check했을 때 완납 or 미납 선택해서 변경이 가능 */}
      {currentSituation === '확인중' && isAbleChange ? (
        <>
          <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '완납'} onClick={() => setSituationToChange('완납')}>
            {SITUATION_STATUS_FORMAT['완납']}
          </Style.SituationButton>

          <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '미납'} onClick={() => setSituationToChange('미납')}>
            {SITUATION_STATUS_FORMAT['미납']}
          </Style.SituationButton>
        </>
      ) : (
        <Style.SituationButton situationType={situationToChange}>{SITUATION_STATUS_FORMAT[situationToChange]}</Style.SituationButton>
      )}
    </Style.SituationContainer>
  );
};

export default SituationButton;
