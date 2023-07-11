import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import theme from '@/styles/Theme';
import { CheckDetailFine, SetCheckDetailFine } from '@/hooks/useCheckDetailFine';
import { useUpdateDetailStatus } from '@/queries/Detail';

type Props = {
  checkDetailFine: CheckDetailFine;
  paymentControl: { type: string; isOpen: boolean };
};
const RequestChangePayment = ({ checkDetailFine }: Props) => {
  const { mutate: mutateDetailStatus } = useUpdateDetailStatus();
  return (
    <Style.UserDetailsFrame>
      <Style.Header>
        <Style.CloseIcon onClick={() => console.log('닫기')}>{SYSTEM.CLOSE}</Style.CloseIcon>
        <span>닫기</span>
      </Style.Header>

      <Style.Main>
        <Style.Title>납부 여부 변경하기</Style.Title>

        <Style.SubTitle>
          선택된 모든 내역을 <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>완납</span>으로 변경하시겠습니까?
        </Style.SubTitle>

        <Style.SituationContainer>
          <Style.SituationButton>확인요청</Style.SituationButton>
          <Style.Arrow />
          <Style.SituationButton situationType="full">납부완료</Style.SituationButton>
          <Style.SituationButton situationType="non">미납</Style.SituationButton>
        </Style.SituationContainer>

        <Style.DatePeriodContainer>2023.05.24 - 2023.08.24</Style.DatePeriodContainer>

        <Style.ListContainer>
          <Style.Item>
            <input type="checkbox" />
            <Style.ItemTitle>안녕하세요안녕하세요</Style.ItemTitle>
            <Style.AmountConatiner>100000000원</Style.AmountConatiner>
          </Style.Item>
          <Style.Item>
            <input type="checkbox" />
            <Style.ItemTitle>안녕하세요안녕하세요안녕</Style.ItemTitle>
            <Style.AmountConatiner>100000000원</Style.AmountConatiner>
          </Style.Item>
        </Style.ListContainer>
      </Style.Main>
      <Style.Footer>
        <Style.Button>취소</Style.Button>

        <Style.Button isSubmit={true}>변경하기</Style.Button>
      </Style.Footer>
    </Style.UserDetailsFrame>
  );
};

export default RequestChangePayment;
