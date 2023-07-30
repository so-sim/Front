import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import theme from '@/styles/Theme';
import { CheckDetailFine, SelectedEventInfo_Checked, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import { useUpdateDetailStatus } from '@/queries/Detail';
import { useParams, useSearchParams } from 'react-router-dom';
import ItemList from './ItemList';
import { useParticipantList } from '@/queries/Group';
import { useEffect, useState } from 'react';
import { Situation } from '@/types/event';
import { useGroupDetail } from '@/queries/Group';
import { useSelectedContext, initialSelectData } from '@/contexts/SelectedFineContext';
import { useRequestNotification } from '@/queries/Notification/useRequestNotifaction';

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

// 해당 컴포넌트 네이밍 고민 중..
// PackageMutate 페이지
// DetailPackage
// PaymentStatement
// alert // change // upDate

// 지금 총무 checkBox 클릭을 어떻게 할건지 얘기를 나눠봐야함

type Member = '총무' | '팀원';

type SituationByAdmin = `${Situation}${Member}`;

type ExcludeSituationByAdmin<T extends SituationByAdmin> = T extends '완납팀원' | '확인중팀원' ? never : T;

type Excluded = ExcludeSituationByAdmin<SituationByAdmin>;

// 리터럴을 omit이 안되나
const SituationBtnObj: Record<Excluded, React.ElementType<any>> = {
  미납총무: ({ situationToChange, setSituationToChange, ...props }) => (
    <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '완납'} onClick={() => setSituationToChange('완납')} {...props}>
      입금완료
    </Style.SituationButton>
  ),
  미납팀원: ({ situationToChange, setSituationToChange, ...props }) => (
    <Style.SituationButton onClick={() => setSituationToChange('확인중')} {...props}>
      확인요청
    </Style.SituationButton>
  ),
  완납총무: ({ situationToChange, setSituationToChange, ...props }) => (
    <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '미납'} onClick={() => setSituationToChange('미납')} {...props}>
      미납
    </Style.SituationButton>
  ),

  확인중총무: ({ situationToChange, setSituationToChange, ...props }) => (
    <>
      <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '완납'} onClick={() => setSituationToChange('완납')} {...props}>
        입금완료
      </Style.SituationButton>

      <Style.SituationButton situationType={situationToChange} isClick={situationToChange === '미납'} onClick={() => setSituationToChange('미납')} {...props}>
        미납
      </Style.SituationButton>
    </>
  ),
};
// 이 부분 situationType 붙여서 컴포넌트 화 예정입니다 (아니면 HOC패턴으로 리팩토링?)
// 완납 확인중 (팀원)을 안넣은 이유는 필터링을 해주려고 한다.

const AlarmRequest_PaymentUpdate = ({ checkDetailFine, setCheckDetailFine }: Props) => {
  const { groupId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get('type');

  const [situationToChange, setSituationToChange] = useState<Situation>('미납');

  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

  const { setInitCheckDetailFine } = setCheckDetailFine;

  const { data: participantData } = useParticipantList(Number(groupId));

  const participantList = [participantData?.content.adminNickname, ...(participantData?.content.nicknameList || [])];

  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  useEffect(() => {
    closePage();
  }, []);

  // recoil로 관리하기 searchParams

  useEffect(() => {
    setSelectedFine(initialSelectData);
  }, [searchParams]);
  // 새로고침 시 url이 유지되어있어서 빈 창이 나와있음(새로고침 시 searchParam 지우는 방법이 있는지 찾아볼 예정..)

  useEffect(() => {
    if (Object.values(checkDetailFine)[0]?.situation === '완납') {
      setSituationToChange('미납');
    } else if (!isAdmin) {
      setSituationToChange('확인중');
    } else {
      setSituationToChange('완납');
    }
  }, [checkDetailFine]);

  const closePage = () => {
    searchParams.delete('type');
    setSearchParams();
  };

  const onSuccess = () => {
    closePage();
    setInitCheckDetailFine();
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccess);
  const { mutate: mutateRequestNotification } = useRequestNotification(onSuccess);

  const currentCheckList = Object.keys(checkDetailFine)
    .filter((item) => checkDetailFine[item].checked === true)
    .map((element) => Number(element));

  const updateSituation = () => {
    mutateDetailStatus({ situation: situationToChange, eventIdList: currentCheckList });
  };

  const requestAlarm = () => {
    mutateRequestNotification();
  };
  // 백엔드 API명세에 아직 추가되어있지않음

  const stringToNumber_Date = (date: string) => +date?.replace(/\./g, '');

  const sortedtList = Object.values(checkDetailFine).sort((a, b) => stringToNumber_Date(a.date) - stringToNumber_Date(b.date));

  const participantSituation_List = (nickName: string, sortedtList: SelectedEventInfo_Checked[]) => sortedtList?.filter((item) => item.nickname === nickName);

  // 해당 로직을 ItemList에서 toggle이 실행되었을 때 해주어도 좋을 것 같다.

  const max_Date = (sortedtList: SelectedEventInfo_Checked[]) => sortedtList.at(-1)?.date;

  const min_Date = (sortedtList: SelectedEventInfo_Checked[]) => sortedtList[0].date;

  if (!searchParams.has('type')) return null;

  // 조건부 렌더링에 checkDetailFine 이 0일 때도 null을 출력할지 고민 중

  const prefix = isAdmin ? '총무' : '팀원';
  console.log(Object.values(checkDetailFine)[0].situation + prefix);
  const SituationBtnComponent = SituationBtnObj[(Object.values(checkDetailFine)[0].situation + prefix) as Excluded];
  return (
    <>
      <Style.UserDetailsFrame onClick={(e) => e.stopPropagation()}>
        <Style.Header>
          <Style.CloseIcon onClick={closePage}>{SYSTEM.CLOSE}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Header>

        <Style.Main>
          {type && Status[type].title}
          {type && Status[type].subTitle(situationToChange)}

          {type === 'situation_change' && (
            <Style.SituationContainer>
              <Style.SituationButton>{Object.values(checkDetailFine)[0].situation}</Style.SituationButton>
              <Style.Arrow />
              <SituationBtnComponent situationToChange={situationToChange} setSituationToChange={setSituationToChange} />
            </Style.SituationContainer>
            // 스타일 재정의 필요
          )}

          <Style.DatePeriodContainer>
            {min_Date(sortedtList)} -{max_Date(sortedtList)}
          </Style.DatePeriodContainer>

          <Style.ListContainer>
            {participantList?.map((nickName) => (
              <ItemList key={nickName} myName={nickName as string} list={participantSituation_List(nickName as string, sortedtList)} setCheckDetailFine={setCheckDetailFine} />
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
      <Style.BackDrop onClick={(e) => e.stopPropagation()} />
    </>
  );
};

export default AlarmRequest_PaymentUpdate;
