import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { useParticipantList } from '@/queries/Group';
import { copyInvitationLink } from '@/utils/copyInvitationLink';
import { useParams } from 'react-router-dom';
import MemberListItem from './components/MemberListItem';
import * as Style from './styles';

const MemberManagement = () => {
  const { groupId } = useParams();

  const { data: participantList } = useParticipantList({ groupId: Number(groupId) });

  return (
    <>
      <Style.Container>
        <Style.Title>
          <h2>멤버 관리</h2>
          <Style.ButtonFlex onClick={() => copyInvitationLink(Number(groupId))}>
            {SYSTEM.LINK_BLACK}
            <span>초대링크 복사</span>
          </Style.ButtonFlex>
        </Style.Title>
        <Style.AdminContainer>
          <div>{USER.PERSON_XL}</div>
          <span>{participantList?.content.adminNickname}</span>
          <Style.Tage>총무</Style.Tage>
        </Style.AdminContainer>
        {participantList?.content.nicknameList.map((nickname) => (
          <MemberListItem nickname={nickname} key={nickname} />
        ))}
      </Style.Container>
    </>
  );
};

export default MemberManagement;
