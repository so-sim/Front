import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import MemberListItem from '@/components/MemberManagement/MemberListItem';
import { GA } from '@/constants/GA';
import { useGroupDetail, useParticipantList } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { copyInvitationLink } from '@/utils/copyInvitationLink';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

const MemberManagement = () => {
  const { groupId } = useParams();

  const { data: participantList } = useParticipantList(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));
  // 혹시 이거 때문인가.. 데이터를 갈아 끼워줘도 recoil이 갈아끼워지지 않으니까..
  // recoil로 관리를 하니까 사이드 이펙트가 발생하는구나
  // 괜히 서버 상태는 tanstack-query로 캐시를 다루고 있으니까, optimistic update를 할 때에도 문제가 발생해
  //
  const { data: group } = useGroupDetail(Number(groupId));

  return (
    <>
      <Style.Container>
        <Style.Title>
          <h2>멤버 관리</h2>
          <Style.ButtonFlex onClick={() => copyInvitationLink(Number(groupId))} id={GA.INVITATION.MEMBER}>
            {SYSTEM.LINK_BLACK}
            <span>초대링크 복사</span>
          </Style.ButtonFlex>
        </Style.Title>
        <Style.UserContainer>
          <Style.UserIcon>{USER.PERSON_XL}</Style.UserIcon>
          <span>{participantList?.content.adminNickname}</span>
          <Style.Tag>총무</Style.Tag>
          {group?.content.isAdmin && <Style.Tag>나</Style.Tag>}
        </Style.UserContainer>
        {myNickname && !group?.content.isAdmin && (
          <Style.UserContainer>
            <Style.UserIcon>{USER.PERSON_XL}</Style.UserIcon>
            <div>{myNickname.content.nickname}</div>
            <Style.Tag>나</Style.Tag>
          </Style.UserContainer>
        )}
        {participantList?.content.nicknameList.map((nickname) => {
          if (nickname !== myNickname?.content.nickname) {
            return <MemberListItem nickname={nickname} key={nickname} />;
          }
        })}
      </Style.Container>
    </>
  );
};

export default MemberManagement;
