import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import theme from '@/styles/Theme';
import { CheckDetailFine, SetCheckDetailFine } from '@/hooks/useCheckDetailFine';
import { useUpdateDetailStatus } from '@/queries/Detail';
import { useParams, useSearchParams } from 'react-router-dom';
import ItemList from './ItemList';
import { useParticipantList } from '@/queries/Group';

type Props = {
  checkDetailFine: CheckDetailFine;
  setCheckDetailFine: SetCheckDetailFine;
};

const RequestChangePayment = ({ checkDetailFine, setCheckDetailFine }: Props) => {
  const { groupId } = useParams();

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: participantData } = useParticipantList(Number(groupId));
  const participantList = participantData?.content.nicknameList;

  const participantPaymentList = (nickName: string) =>
    Object.values(checkDetailFine)
      .filter((item) => item.nickname === nickName)
      .sort((a, b) => +a.date.replace(/\./g, '') - +b.date.replace(/\./g, ''));
  // 해당 로직을 ItemList에서 toggle이 실행되었을 때 해주어도 좋을 것 같다.

  if (!searchParams.has('type')) return null;

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
          {participantList?.map((nickName) => (
            <ItemList key={nickName} myName={nickName} list={participantPaymentList(nickName)} setCheckDetailFine={setCheckDetailFine} />
          ))}
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
