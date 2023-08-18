import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';

type Props<T> = {
  value: T;
  width?: string;
};

const MobileDropbox = <T extends string>({ value, width = '100%' }: Props<T>) => {
  return (
    <Style.Dropbox active={Boolean(value)} width={width}>
      <span>{value || '선택해주세요'}</span>
      {ARROW.DOWN_LG_NON_FOCUS}
    </Style.Dropbox>
  );
};

export default MobileDropbox;
