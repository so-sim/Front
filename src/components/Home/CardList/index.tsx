import { useState } from 'react';
import { AddCard } from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import { CreateGroupModal } from '@/components/@common/Modal/CreateGroupModal';
import * as Style from './styles';
import { userState } from '@/store/userState';
import { useRecoilValue } from 'recoil';
import { AuthModal } from '@/components/@common/Modal/LoginModal';
import React from 'react';
import { GA } from '@/constants/GA';
import useInfinityGroupList from '@/hooks/Group/useInfinityGroupList';

export const CardList = () => {
  const { userId } = useRecoilValue(userState);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { ref, groups } = useInfinityGroupList();

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
        {groups?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page?.content?.groupList.map((group) => (
              <GroupCard {...group} key={group.groupId} />
            ))}
          </React.Fragment>
        ))}
        <div ref={ref} />
      </Style.CardList>
      {showCreateGroupModal && <CreateGroupModal modalHandler={handleCreateGroupModal} id={GA.CREATE.MAIN_MODAL} />}
      {showLoginModal && <AuthModal modalHandler={handleCreateGroupModal} />}
    </>
  );
};
