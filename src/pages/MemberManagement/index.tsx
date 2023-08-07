import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import MemberListItem from '@/components/MemberManagement/MemberListItem';
import { GA } from '@/constants/GA';
import useMemberManageMent from '@/hooks/Member/useMemberManageMent';
import { useGroupDetail, useParticipantList } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { copyInvitationLink } from '@/utils/copyInvitationLink';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

const MemberManagement = () => {
  const { groupId, participantList, myNickname, group } = useMemberManageMent();

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
