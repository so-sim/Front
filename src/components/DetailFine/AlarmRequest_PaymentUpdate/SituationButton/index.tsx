import * as Style from './styles';

import { Situation } from '@/types/event';

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
      {/* 총무가 확인 중 상태를 Check했을 때 완납 or 미납 선택해서 변경이 가능 */}
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
