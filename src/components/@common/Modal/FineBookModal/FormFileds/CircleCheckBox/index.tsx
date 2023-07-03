import styled from '@emotion/styled';
import * as Style from './styles';

type Props = {
  id: any;
  isChecked: boolean;
  onChange: () => void;
};

const CirCleCheckBox = ({ id, isChecked, onChange }: Props) => {
  return (
    <Style.CheckBoxContainer>
      <Style.Input type="checkbox" id={id} checked={isChecked} readOnly />
      <Style.CheckBoxWrapper onClick={onChange}>
        <Style.CheckBox checked={isChecked} />
        <Style.Text htmlFor={id}>{id}</Style.Text>
      </Style.CheckBoxWrapper>
    </Style.CheckBoxContainer>
  );
};

export default CirCleCheckBox;
