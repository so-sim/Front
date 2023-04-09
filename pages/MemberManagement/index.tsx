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

  const { data: participantList } = useParticipantList({ groupId: Number(groupId) });
  const { data: myNickname } = useGetMyNikname({ groupId: Number(groupId) });
  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });

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
        <Style.AdminContainer>
          <div>{USER.PERSON_XL}</div>
          <span>{participantList?.content.adminNickname}</span>
          <Style.Tage>총무</Style.Tage>
        </Style.AdminContainer>
        {myNickname && !groupData?.content.isAdmin && <MemberListItem nickname={myNickname.content.nickname} />}
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
