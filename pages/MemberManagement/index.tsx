import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { useGroupDetail, useParticipantList } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { copyInvitationLink } from '@/utils/copyInvitationLink';
import { useParams } from 'react-router-dom';
import MemberListItem from './components/MemberListItem';
import * as Style from './styles';

const MemberManagement = () => {
  const { groupId } = useParams();

  const { data: participantList } = useParticipantList(Number(groupId));
  const { data: myNickname } = useGetMyNikname(groupId);
  const { data: groupData } = useGroupDetail(Number(groupId));

  return (
    <>
      <Style.Container>
        <Style.Title>
          <h2>멤버 관리</h2>
          <Style.ButtonFlex onClick={() => copyInvitationLink(Number(groupId))} id="invitation_member">
            {SYSTEM.LINK_BLACK}
            <span>초대링크 복사</span>
          </Style.ButtonFlex>
        </Style.Title>
        <Style.UserContainer>
          <div>{USER.PERSON_XL}</div>
          <span>{participantList?.content.adminNickname}</span>
          <Style.Tag>총무</Style.Tag>
          {groupData?.content.isAdmin && <Style.Tag>나</Style.Tag>}
        </Style.UserContainer>
        {myNickname && !groupData?.content.isAdmin && (
          <Style.UserContainer>
            <div>{USER.PERSON_XL}</div>
            <div>{myNickname.content.nickname}</div>
            <Style.Tag>나</Style.Tag>
          </Style.UserContainer>
        )}
        {participantList?.content.memberList.map(({ nickname, userId }) => {
          if (nickname !== myNickname?.content.nickname) {
            return <MemberListItem nickname={nickname} key={userId} />;
          }
        })}
      </Style.Container>
    </>
  );
};

export default MemberManagement;
