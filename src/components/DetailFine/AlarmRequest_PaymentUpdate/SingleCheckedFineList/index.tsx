import CheckboxContainer from '@/components/@common/Checkbox';
import CheckStatusListWrapper from '@/components/@common/CheckStatusListWrapper';
import { SetCheckDetailFine, SelectedEventInfo_Checked } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import { SelectedEventInfo } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertFormat';

import DetailListCheckBox from '../../checkbox';
import MemberListCheckbox from '../../checkboxList';
import * as Style from './styles';

type Props = {
  checkDetailFine: SelectedEventInfo[];
  setCheckDetailFine: (details: SelectedEventInfo) => void;
  isChecked: (eventId: number) => boolean;
  isDisabled?: (eventId: number) => boolean | undefined;
  noCheckBox?: boolean;
};

const SingleCheckedFineList = ({ checkDetailFine, setCheckDetailFine, isChecked, isDisabled = () => false, noCheckBox = false }: Props) => {
  return (
    <Style.Container>
      {checkDetailFine.map((item, index) => (
        <CheckStatusListWrapper checked={isChecked(item.eventId)} disabled={isDisabled(item.eventId)} key={index}>
          <Style.ItemContainer key={item.eventId}>
            <Style.CheckBoxWrapper>
              {!noCheckBox && (
                <CheckboxContainer id={String(item.eventId)} isChecked={isChecked(item.eventId)} onChange={(event: React.MouseEvent<HTMLInputElement>) => setCheckDetailFine(item)}>
                  <CheckboxContainer.Checkbox as={MemberListCheckbox} disabled={isDisabled(item.eventId)} />
                </CheckboxContainer>
              )}
            </Style.CheckBoxWrapper>
            {/* 체크박스 disabled */}
            <Style.TextWrapper>
              <Style.DateText $disabled={isDisabled(item.eventId)}>{item.date}</Style.DateText>
              <Style.DescriptionContainer>
                <Style.DescriptionGround $disabled={isDisabled(item.eventId)}>{item.ground}</Style.DescriptionGround>
                <Style.Division />
                <Style.DescriptionMemo>{item.memo}</Style.DescriptionMemo>
                <Style.AmountText $disabled={isDisabled(item.eventId)}>{convertToPriceFormat(item.amount)} 원</Style.AmountText>
              </Style.DescriptionContainer>
            </Style.TextWrapper>
          </Style.ItemContainer>
        </CheckStatusListWrapper>
      ))}
    </Style.Container>
  );
};

export default SingleCheckedFineList;

// 스타일을 객체로 만들지
// 스타일을 컴포넌트로 감쌀찌(상태마다 스타일을 다르게하는 컴포넌트 (hover,check, disable))
