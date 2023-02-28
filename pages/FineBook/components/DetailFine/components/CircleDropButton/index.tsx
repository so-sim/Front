import { CIRCLE_DROP } from '../../../../../../assets/icons/CircleDrop';
import * as Style from './styles';

interface CircleDropButtonProps {
  status: string;
}

export const CircleDropButton = ({ status }: CircleDropButtonProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'none':
        return CIRCLE_DROP.RED;
      case 'checking':
        return CIRCLE_DROP.YELLOW;
      case 'complete':
        return CIRCLE_DROP.BLUE;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'none':
        return '미납';
      case 'checking':
        return '확인중';
      case 'complete':
        return '완납';
    }
  };

  return (
    <Style.StatusButton status={status}>
      <Style.Text>{getStatusText(status)}</Style.Text>
      <Style.Icon>{getStatusIcon(status)}</Style.Icon>
    </Style.StatusButton>
  );
};
