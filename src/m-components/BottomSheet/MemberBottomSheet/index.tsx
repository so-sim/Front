import { USER } from '@/assets/icons/User';
import { useParticipantList } from '@/queries/Group';
import React from 'react';
import { useParams } from 'react-router-dom';
import BottomSheet from '..';

import * as Style from './styles';

type Props = {
  onClose: () => void;
  onChange: (value: string) => void;
};

const MemberBottomSheet = ({ onClose, onChange }: Props) => {
  const { groupId } = useParams();
  const { data: participants } = useParticipantList(Number(groupId));

  const memberList = [participants?.content.adminNickname as string, ...(participants?.content.nicknameList ?? [])].sort();

  const handleSelectMember = (member: string) => {
    onChange(member);
    onClose();
  };

  return (
    <BottomSheet title="팀원" onClose={onClose}>
      <Style.MemberList>
        {memberList.map((member) => (
          <Style.MemberListItem key={member} onClick={() => handleSelectMember(member)}>
            {USER.PERSON_24}
            {member}
          </Style.MemberListItem>
        ))}
      </Style.MemberList>
    </BottomSheet>
  );
};

export default MemberBottomSheet;
