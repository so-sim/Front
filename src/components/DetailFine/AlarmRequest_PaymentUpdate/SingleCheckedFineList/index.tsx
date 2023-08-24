import CheckboxContainer from '@/components/@common/Checkbox';
import { SetCheckDetailFine, SelectedEventInfo_Checked } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import { SelectedEventInfo } from '@/types/event';

import DetailListCheckBox from '../../checkbox';
import * as Style from './styles';

type Props = {
  checkDetailFine: SelectedEventInfo[];
  setCheckDetailFine: (details: SelectedEventInfo) => void;
  isChecked: (eventId: number) => boolean;
};

const SingleCheckedFineList = ({ checkDetailFine, setCheckDetailFine, isChecked }: Props) => {
  return (
    <Style.Container>
      {checkDetailFine.map((item) => (
        <Style.ItemContainer key={item.eventId}>
          <Style.CheckBoxWrapper>
            <CheckboxContainer id={String(item.eventId)} isChecked={isChecked(item.eventId)} onChange={(event: React.MouseEvent<HTMLInputElement>) => setCheckDetailFine(item)}>
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
    </Style.Container>
  );
};

export default SingleCheckedFineList;
