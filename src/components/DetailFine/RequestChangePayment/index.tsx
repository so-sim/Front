import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import theme from '@/styles/Theme';
import { CheckDetailFine, SetCheckDetailFine } from '@/hooks/useCheckDetailFine';
import { useUpdateDetailStatus } from '@/queries/Detail';
import { useParams, useSearchParams } from 'react-router-dom';
import ItemList from './ItemList';
import { useParticipantList } from '@/queries/Group';
import { useState } from 'react';
import { Situation } from '@/types/event';

type Props = {
  checkDetailFine: CheckDetailFine;
  setCheckDetailFine: SetCheckDetailFine;
};

type StatusType = {
  [key: string]: {
    title: JSX.Element;
    subTitle: (situationToChange?: Situation) => JSX.Element;
  };
};

const Status: StatusType = {
  situation_change: {
    title: <Style.Title>납부 여부 변경하기</Style.Title>,
    subTitle: (situationToChange?: Situation) => (
      <Style.SubTitle>
        선택된 모든 내역을{' '}
        <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px', color: situationToChange === '완납' ? theme.colors.primary_600 : theme.colors.red_600 }}>
          {situationToChange}
        </span>
        으로 변경하시겠습니까?
      </Style.SubTitle>
    ),
  },
  alarm_request: {
    title: <Style.Title>납부 요청하기</Style.Title>,
    subTitle: () => <Style.SubTitle>선택된 팀원에게 벌금 알림을 보내시겠습니까?</Style.SubTitle>,
  },
};

// 해당 Status onSubmit도 추가해서 함께 다루고 싶지만.. 컴포넌트 안에 이 부분을 추가하기 애매해서 일다 ㄴ빼놓았음

const RequestChangePayment = ({ checkDetailFine, setCheckDetailFine }: Props) => {
  const { groupId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [situationToChange, setSituationToChange] = useState<Situation>('완납');

  const { setInitCheckDetailFine } = setCheckDetailFine;

  const closePage = () => {
    searchParams.delete('type');
    setSearchParams();
  };

  const onSuccess = () => {
    closePage();
    setInitCheckDetailFine();
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccess);

  const updateCheckList = Object.keys(checkDetailFine)
    .filter((item) => checkDetailFine[item].checked === true)
    .map((element) => Number(element));

  const updateSituation = async () => {
    mutateDetailStatus({ situation: situationToChange, eventIdList: updateCheckList });
  };

  const requestAlarm = () => {};
  // 백엔드 API명세에 아직 추가되어있지않음

  const { data: participantData } = useParticipantList(Number(groupId));
  const participantList = participantData?.content.nicknameList;

  const participantPaymentList = (nickName: string) =>
    Object.values(checkDetailFine)
      .filter((item) => item.nickname === nickName)
      .sort((a, b) => +a.date.replace(/\./g, '') - +b.date.replace(/\./g, ''));
  // 해당 로직을 ItemList에서 toggle이 실행되었을 때 해주어도 좋을 것 같다.

  const type = searchParams.get('type');
  console.log(type);

  if (!searchParams.has('type')) return null;

  return (
    <Style.UserDetailsFrame>
      <Style.Header>
        <Style.CloseIcon onClick={closePage}>{SYSTEM.CLOSE}</Style.CloseIcon>
        <span>닫기</span>
      </Style.Header>

      <Style.Main>
        {type && Status[type].title}
        {type && Status[type].subTitle(situationToChange)}

        {type === 'situation_change' && (
          <Style.SituationContainer>
            <Style.SituationButton>확인요청</Style.SituationButton>
            <Style.Arrow />
            <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '완납'} onClick={() => setSituationToChange('완납')}>
              납부완료
            </Style.SituationButton>
            <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '미납'} onClick={() => setSituationToChange('미납')}>
              미납
            </Style.SituationButton>
          </Style.SituationContainer>
        )}

        <Style.DatePeriodContainer>2023.05.24 - 2023.08.24</Style.DatePeriodContainer>

        <Style.ListContainer>
          {participantList?.map((nickName) => (
            <ItemList key={nickName} myName={nickName} list={participantPaymentList(nickName)} setCheckDetailFine={setCheckDetailFine} />
          ))}
        </Style.ListContainer>
      </Style.Main>
      <Style.Footer>
        <Style.Button>취소</Style.Button>

        <Style.Button isSubmit={true} onClick={type === 'situation_change' ? updateSituation : requestAlarm}>
          변경하기
        </Style.Button>
      </Style.Footer>
    </Style.UserDetailsFrame>
  );
};

export default RequestChangePayment;
