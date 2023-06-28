import { useGroupDetail } from '@/queries/Group';
import { Situation } from '@/types/event';
import { useParams } from 'react-router-dom';

type ConfirmButtonText = '확인요청' | '확인필요' | '확인중';
export type SituationText = Situation | ConfirmButtonText;

const SITUATION_LIST: Situation[] = ['미납', '확인중', '완납'];

const useSituationList = (situation: Situation) => {
  const { groupId } = useParams();
  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const adminStatusList: SituationText[] = [
    situation === '확인중' ? '확인필요' : situation,
    ...SITUATION_LIST.filter((element) => {
      if (situation === '확인중') return element !== situation;

      return element !== situation && element !== '확인중';
    }),
  ];

  //요청은 어차피 리스트에서 밖에 안 나오잖아.
  const userStatusList: SituationText[] = situation === '미납' ? ['미납', '확인요청'] : [];
  const dropdownList: SituationText[] = isAdmin ? adminStatusList : userStatusList;

  const convertSituationToText = (situation: Situation): SituationText => {
    if (situation === '확인중' && isAdmin) return '확인필요';
    return situation;
  };

  const convertTextToSituation = (text: SituationText): Situation => {
    if (text === '미납' || text === '완납') return text;
    return '확인중';
  };

  return { dropdownList, convertTextToSituation, convertSituationToText };
};

export default useSituationList;
