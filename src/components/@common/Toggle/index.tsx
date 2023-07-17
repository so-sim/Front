import React, { Dispatch, SetStateAction } from 'react';
import * as Style from './styles';

type Props = {
  onToggle: boolean;
  setOnToggle: Dispatch<SetStateAction<boolean>>;
};

export const Toggle = ({ onToggle, setOnToggle }: Props) => {
  const toggleHandler = () => {
    setOnToggle((prev) => !prev);
  };

  return (
    <Style.Background onToggle={onToggle} onClick={toggleHandler}>
      <Style.ToggleButton onToggle={onToggle} />
    </Style.Background>
  );
};
