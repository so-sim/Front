import DoubleRight from './DoubleRight.svg';
import DoubleLeft from './DoubleLeft.svg';
import Down from './Down.svg';
import Left from './Left.svg';
import Right from './Right.svg';
import Solid from './Solid.svg';

export const ARROW = {
  DOUBLE_RIGHT: <DoubleRight />,
  DOUBLE_LEFT: <DoubleLeft />,
  DOWN_SM: <Down width={16} height={16} fill="#3C3C3C" />,
  DOWN_LG: <Down width={24} height={24} fill="#3C3C3C" />,
  DOWN_LG_GRAY: <Down width={24} height={24} fill="#9C9C9C" />,
  DOWN_LG_NON_FOCUS: <Down width={24} height={24} fill="#BDBDBD" />,
  LEFT: <Left width={8} height={12} />,
  RIGHT: <Right width={8} height={12} />,
  LEFT_MD: <Left width={8} height={12} />,
  RIGHT_MD: <Right width={8} height={12} />,
  SOLID: <Solid />,
  DOUBLE_RIGHT_PROPS: ({ ...props }) => <DoubleRight {...props} />,
  DOUBLE_LEFT_PROPS: ({ ...props }) => <DoubleLeft {...props} />,
};
