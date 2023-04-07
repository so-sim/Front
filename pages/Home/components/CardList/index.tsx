import { useEffect, useState } from 'react';
import { AddCard } from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import { CreateGroupModal } from '@/common/Modal/CreateGroupModal';
import * as Style from './styles';
import { useGroupList } from '@/queries/Group/';
import { userState } from '@/store/userState';
import { useRecoilValue } from 'recoil';
import { AuthModal } from '@/common/Modal/LoginModal';
import { useInView } from 'react-intersection-observer';
import React from 'react';

export const CardList = () => {
  const { userId } = useRecoilValue(userState);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { ref, inView } = useInView();

  const { data: groups, fetchNextPage, hasNextPage } = useGroupList();

  const handleCreateGroupModal = () => {
    const isLoggedIn = userId !== null;
    if (isLoggedIn) {
      setShowCreateGroupModal((prev) => !prev);
    } else {
      setShowLoginModal((prev) => !prev);
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
      {showCreateGroupModal && <CreateGroupModal modalHandler={handleCreateGroupModal} id="create_main_modal" />}
      {showLoginModal && <AuthModal modalHandler={handleCreateGroupModal} />}
    </>
  );
};
