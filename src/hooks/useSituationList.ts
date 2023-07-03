import { useGroupDetail } from '@/queries/Group';
import { Situation } from '@/types/event';
import { useParams } from 'react-router-dom';

type ConfirmButtonText = '확인요청' | '확인필요' | '확인중';
export type SituationText = '납부 전' | '납부완료' | '승인대기' | '나타나면 이상한 거임';

const SITUATION_LIST: SituationText[] = ['납부 전', '승인대기', '납부완료'];

type ServerSituation = '미납' | '확인중' | '완납';
//  { [key in ServerSituation]: SituationText | { [str in ServerSituation]: SituationText } }
const CLIENT_SITUATION = {
  미납: '납부 전',
  완납: '납부완료',
  확인중: {
    미납: '납부완료',
    확인중: '승인대기',
    완납: '나타나면 이상한 거임',
  },
};

export const getClientSituationTextFromServer = (situation: ServerSituation, comparedSituation: ServerSituation): SituationText => {
  if (situation === '완납' || situation === '미납') {
    return CLIENT_SITUATION[situation] as SituationText;
  }
  // if (comparedSituation === undefined) return '나타나면 이상한 거임';

  if (comparedSituation === '미납') return '납부완료';
  if (comparedSituation === '확인중') return '승인대기';
  return '나타나면 이상한 거임';
  // return CLIENT_SITUATION[situation][comparedSituation] as SituationText;
};

const useSituationList = (situation: Situation) => {
  const { groupId } = useParams();
  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  // const SITUATION_LIST: SituationText[] = ['납부 전', '승인대기', '납부완료'];
  const ssss = getClientSituationTextFromServer(situation, situation);

  const adminStatusList: SituationText[] = [
    situation === '확인중' ? '승인대기' : ssss,
    ...SITUATION_LIST.filter((element) => {
      if (situation === '확인중') return element !== ssss;

      return element !== ssss && element !== '승인대기';
    }),
  ];

  //요청은 어차피 리스트에서 밖에 안 나오잖아.
  const userStatusList: SituationText[] = situation === '미납' ? ['납부 전', '납부완료'] : [];
  const dropdownList: SituationText[] = isAdmin ? adminStatusList : userStatusList;

  const convertSituationToText = (situation: Situation): SituationText => {
    if (situation === '확인중' && isAdmin) return '승인대기';
    return getClientSituationTextFromServer(situation, situation);
  };

  const convertTextToSituation = (text: SituationText): Situation => {
    switch (text) {
      case '승인대기':
        return '확인중';
      case '납부완료':
        if (isAdmin) {
          return '완납';
        }
        return '확인중';
      case '납부 전':
        return '미납';
      default:
        return '미납';
    }

    // if (text === '미납' || text === '완납') return text;
    // return '확인중';
  };

  return { dropdownList, convertTextToSituation, convertSituationToText };
};

export default useSituationList;
