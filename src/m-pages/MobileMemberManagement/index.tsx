import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import MemberListItem from '@/components/MemberManagement/MemberListItem';
import { GA } from '@/constants/GA';
import useMemberManageMent from '@/hooks/Member/useMemberManageMent';
import MobileLayout from '@/layouts/Mobile';
import MobileHeader from '@/layouts/Mobile/components/MobileHeader';
import MobileSideBar from '@/layouts/Mobile/components/MobileSideBar';
import { copyInvitationLink } from '@/utils/copyInvitationLink';
import { useState } from 'react';
import * as Style from './styles';

const MobileMemberManagement = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  const { groupId, participantList, myNickname, group } = useMemberManageMent();

  return (
    <MobileLayout>
      <MobileHeader left={{ onClick: sideBarHandler, icon: SYSTEM.MENU }} title={LOGO.XS} hasAuth />
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
      {openSideBar && <MobileSideBar openSideBar={openSideBar} sideBarHandler={sideBarHandler} />}
    </MobileLayout>
  );
};

export default MobileMemberManagement;
