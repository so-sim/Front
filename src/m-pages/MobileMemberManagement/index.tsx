import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import MemberListItem from '@/components/MemberManagement/MemberListItem';
import { GA } from '@/constants/GA';
import useMemberManageMent from '@/hooks/Member/useMemberManageMent';

import { copyInvitationLink } from '@/utils/copyInvitationLink';
import * as Style from './styles';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import useCopyInvitationLink from '@/hooks/useCopyInvitationLink';
import CopyToClipboard from 'react-copy-to-clipboard';

const MobileMemberManagement = () => {
  const { groupId, participantList, myNickname, group } = useMemberManageMent();
  const { invitationLink, onSuccessCopy } = useCopyInvitationLink();

  return (
    <MobileLayout location="GROUP">
      <Style.Container>
        <Style.Title>
          <h2>멤버 관리</h2>
          <CopyToClipboard text={invitationLink} onCopy={onSuccessCopy}>
            <Style.ButtonFlex onClick={() => {}} id={GA.INVITATION.MEMBER}>
              {SYSTEM.LINK_BLACK}
              <span>초대링크 복사</span>
            </Style.ButtonFlex>
          </CopyToClipboard>
        </Style.Title>
        <Style.UserContainer>
          <Style.UserIcon>{USER.PERSON_XL}</Style.UserIcon>
          <span>{participantList?.content.adminNickname}</span>
          <Style.Tag>총무</Style.Tag>
          {group?.content.isAdmin && <Style.Tag $myTag={true}>나</Style.Tag>}
        </Style.UserContainer>
        {myNickname && !group?.content.isAdmin && (
          <Style.UserContainer>
            <Style.UserIcon>{USER.PERSON_XL}</Style.UserIcon>
            <div>{myNickname.content.nickname}</div>
            <Style.Tag $myTag={true}>나</Style.Tag>
          </Style.UserContainer>
        )}
        {participantList?.content.nicknameList.map((nickname) => {
          if (nickname !== myNickname?.content.nickname) {
            return <MemberListItem nickname={nickname} key={nickname} />;
          }
        })}
      </Style.Container>
    </MobileLayout>
  );
};

export default MobileMemberManagement;
