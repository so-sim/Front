import { useState } from 'react';
import { AddCard } from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import { CreateGroupModal } from '@/common/Modal/CreateGroupModal';
import * as Style from './styles';
import { useGroupList } from '@/queries/Group/';
import { userState } from '@/store/userState';
import { useRecoilValue } from 'recoil';
import { AuthModal } from '@/common/Modal/LoginModal';

export const CardList = () => {
  const { userId } = useRecoilValue(userState);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [index, setIndex] = useState(0);

  const { data } = useGroupList(index);

  const handleCreateGroupModal = () => {
    const isLoggedIn = userId !== null;
    if (isLoggedIn) {
      setShowCreateGroupModal((prev) => !prev);
    } else {
      setShowLoginModal((prev) => !prev);
    }
  };

  return (
    <>
      <Style.CardList>
        <AddCard onClick={handleCreateGroupModal} />
        {data?.content.groupList.map((group) => {
          return <GroupCard {...group} key={group.groupId} />;
        })}
      </Style.CardList>
      {showCreateGroupModal && <CreateGroupModal modalHandler={handleCreateGroupModal} />}
      {showLoginModal && <AuthModal modalHandler={handleCreateGroupModal} />}
    </>
  );
};
