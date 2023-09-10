import * as Style from './styles';

type Props = {
  checked?: boolean;
  disabled?: boolean;
};

const CheckStatusListWrapper = ({ children, checked, disabled }: React.PropsWithChildren<Props>) => {
  return (
    <Style.Container $checked={checked} $disabled={disabled}>
      {children}
    </Style.Container>
  );
};

export default CheckStatusListWrapper;
