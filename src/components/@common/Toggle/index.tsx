import * as Style from './styles';

type Props = {
  toggleState: boolean;
  toggleHandler: () => void;
};

export const Toggle = ({ toggleState, toggleHandler }: Props) => {
  return (
    <Style.Background toggleState={toggleState} onClick={toggleHandler}>
      <Style.ToggleButton toggleState={toggleState} />
    </Style.Background>
  );
};
