import { AddCard } from '@/components/Home/Card/AddCard';
import { GroupCard } from '@/components/Home/Card/GroupCard';
import useInfinityGroupList from '@/hooks/Group/useInfinityGroupList';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Style from './styles';

import { Footer } from '../Footer';

const MobileGroupSection = () => {
  const { groups, ref, hasNextPage } = useInfinityGroupList();
  const navigate = useNavigate();

  const moveToGroup = (groupId: number) => {
    navigate(`/m-group/${groupId}/book`);
  };

  const moveToCreateGroup = () => {
    navigate('/m-home/create-group');
  };

  return (
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
  );
};

export default MobileGroupSection;
