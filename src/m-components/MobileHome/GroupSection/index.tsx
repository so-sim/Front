import { AddCard } from '@/components/Home/Card/AddCard';
import { GroupCard } from '@/components/Home/Card/GroupCard';
import useInfinityGroupList from '@/hooks/Group/useInfinityGroupList';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Style from './styles';
import { AuthModal } from '@/components/@common/Modal/LoginModal';
import { Footer } from '../Footer';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';

const MobileGroupSection = () => {
  const { groups, ref, hasNextPage } = useInfinityGroupList();
  const [user] = useRecoilState(userState);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const navigate = useNavigate();

  const moveToGroup = (groupId: number) => {
    navigate(`/m-group/${groupId}/book`);
  };

  const handleLoginModal = () => {
    setOpenLoginModal((prev) => !prev);
  };

  const moveToCreateGroup = () => {
    if (!user.userId) {
      handleLoginModal();
      return;
    }
    navigate('/m-home/create-group');
  };

  return (
    <>
      <Style.GroupSection>
        <div>
          <div style={{ height: '200px', width: '100%', backgroundColor: '#000000' }} />
          <Style.Title>참여 모임</Style.Title>
          <Style.CardList>
            <AddCard onClick={moveToCreateGroup} size="sm" />
            {groups?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page?.content?.groupList.map((group) => (
                  <GroupCard //
                    {...group}
                    key={group.groupId}
                    onClick={() => moveToGroup(group.groupId)}
                    size="sm"
                  />
                ))}
              </React.Fragment>
            ))}
          </Style.CardList>
          <div ref={ref} />
        </div>
        <Footer />
      </Style.GroupSection>
      {openLoginModal && <AuthModal modalHandler={handleLoginModal} />}
    </>
  );
};

export default MobileGroupSection;
