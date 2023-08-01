import { GA } from '@/constants/GA';
import { getClientSituationTextFromServer } from '@/hooks/useSituationList';
import { Situation } from '@/types/event';
import { getStatusIcon } from '@/utils/status';
import * as Style from './styles';

interface Props {
  situation: Situation;
  origin: Situation;
}

const SITUATION_CODE: { [key in Situation]: 'NON' | 'CON' | 'FULL' } = {
  미납: 'NON',
  확인중: 'CON',
  완납: 'FULL',
};

const CircleDropButton = ({ situation, origin }: Props) => {
  const PAYMENT_TYPE = SITUATION_CODE[situation];

  return (
    <Style.StatusButton situation={situation} id={GA[PAYMENT_TYPE].LIST_BUTTON}>
      <Style.Text>{getClientSituationTextFromServer(situation, origin)}</Style.Text>
      <Style.Icon>{getStatusIcon(situation)}</Style.Icon>
    </Style.StatusButton>
  );
};
export default CircleDropButton;
