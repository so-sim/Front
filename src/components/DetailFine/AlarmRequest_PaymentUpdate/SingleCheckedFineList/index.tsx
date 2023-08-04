import CheckboxContainer from '@/components/@common/Checkbox';
import { SetCheckDetailFine, SelectedEventInfo_Checked } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';

import DetailListCheckBox from '../../checkbox';
import * as Style from './styles';

type Props = {
  checkDetailFine: SelectedEventInfo_Checked[];
  setCheckDetailFine: (eventId: string) => void;
};

const SingleCheckedFineList = ({ checkDetailFine, setCheckDetailFine }: Props) => {
  return (
    <>
      {checkDetailFine.map((item) => (
        <Style.ItemContainer key={item.eventId}>
          <Style.CheckBoxWrapper>
            <CheckboxContainer
              id={String(item.eventId)}
              isChecked={item.checked}
              onChange={(event: React.MouseEvent<HTMLInputElement>) => setCheckDetailFine(String(item.eventId))}
            >
              <CheckboxContainer.Checkbox as={DetailListCheckBox} />
            </CheckboxContainer>
          </Style.CheckBoxWrapper>

          <Style.TextWrapper>
            <Style.DateText>{item.date}</Style.DateText>
            <Style.DescriptionContainer>
              <Style.DescriptionGround>{item.ground}</Style.DescriptionGround>
              <Style.Division />
              <Style.DescriptionMemo>{item.memo}</Style.DescriptionMemo>
              <Style.AmountText>{item.amount} 원</Style.AmountText>
            </Style.DescriptionContainer>
          </Style.TextWrapper>
        </Style.ItemContainer>
      ))}
    </>
  );
};

export default SingleCheckedFineList;
