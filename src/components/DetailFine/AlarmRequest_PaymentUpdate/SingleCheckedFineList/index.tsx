import CheckboxContainer from '@/components/@common/Checkbox';
import { SetCheckDetailFine, SelectedEventInfo_Checked } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import styled from '@emotion/styled';
import DetailListCheckBox from '../../checkbox';

type Props = {
  checkDetailFine: SelectedEventInfo_Checked[];
  setCheckDetailFine: SetCheckDetailFine;
};

const SingleCheckedFineList = ({ checkDetailFine, setCheckDetailFine }: Props) => {
  const { setToggleCheckDetailFine } = setCheckDetailFine;

  return (
    <>
      {checkDetailFine.map((item) => (
        <ItemContainer key={item.eventId}>
          <CheckBoxWrapper>
            <CheckboxContainer
              id={String(item.eventId)}
              isChecked={item.checked}
              onChange={(event: React.MouseEvent<HTMLInputElement>) => setToggleCheckDetailFine(String(item.eventId))}
            >
              <CheckboxContainer.Checkbox as={DetailListCheckBox} />
            </CheckboxContainer>
          </CheckBoxWrapper>

          <TextWrapper>
            <DateText>{item.date}</DateText>
            <DescriptionContainer>
              <DescriptionGround>{item.ground}</DescriptionGround>
              <Division />
              <DescriptionMemo>{item.memo}</DescriptionMemo>
              <AmountText>{item.amount} 원</AmountText>
            </DescriptionContainer>
          </TextWrapper>
        </ItemContainer>
      ))}
    </>
  );
};

export default SingleCheckedFineList;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 0.5rem 0.5rem 0.5rem 1rem;

  border-radius: 0.25rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_300};
  }
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 0.5rem;
`;

const TextWrapper = styled.div`
  width: 100%;
`;

const DateText = styled.p`
  ${({ theme }) => theme.font.caption};

  color: ${({ theme }) => theme.colors.secondary_500};
`;

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.125rem;
`;

const DescriptionGround = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;

const Division = styled.div`
  width: 1px;
  height: 10px;

  background-color: ${({ theme }) => theme.colors.neutral_400_b};
`;

const DescriptionMemo = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_600};
`;

const AmountText = styled.p`
  margin: 0 0 0 auto;

  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;
