import { MARK } from '@/assets/icons/Mark';
import { GA } from '@/constants/GA';
import { getClientSituationTextFromServer } from '@/hooks/useSituationList';
import { Situation } from '@/types/event';
import { getStatusIcon } from '@/utils/status';
import * as Style from './styles';

interface Props {
  situation: Situation;
  origin: Situation;
  isNoAuthority?: boolean;
}

const SITUATION_CODE: { [key in Situation]: 'NON' | 'CON' | 'FULL' } = {
  미납: 'NON',
  확인중: 'CON',
  완납: 'FULL',
};

const SITUATION_MARK_ICON = {
  미납: MARK.RED,
  확인중: MARK.YELLOW,
  완납: MARK.BLUE,
};

const CircleDropButton = ({ situation, origin, isNoAuthority = false }: Props) => {
  const PAYMENT_TYPE = SITUATION_CODE[situation];

  return (
    <Style.StatusButton situation={situation} id={GA[PAYMENT_TYPE].LIST_BUTTON}>
      <Style.MarkIconWrapper>{SITUATION_MARK_ICON[situation]}</Style.MarkIconWrapper>
      <Style.Text>{getClientSituationTextFromServer(situation, origin)}</Style.Text>
      <Style.Icon $situation={situation} $isNoAuthority={isNoAuthority}>
        {getStatusIcon(situation)}
      </Style.Icon>
    </Style.StatusButton>
  );
};
export default CircleDropButton;
