import { AddCard } from '@/components/Home/Card/AddCard';
import { GroupCard } from '@/components/Home/Card/GroupCard';
import useInfinityGroupList from '@/hooks/Group/useInfinityGroupList';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Style from './styles';

const MobileGroupSection = () => {
  const { groups, ref, hasNextPage } = useInfinityGroupList();
  const navigate = useNavigate();

  const moveToGroup = (groupId: number) => {
    navigate(`/group/${groupId}/book`);
  };

  const moveToCreateGroup = () => {
    navigate('/m-home/create-group');
  };

  return (
    <>
      <Style.GroupSection>
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
      </Style.GroupSection>
    </>
  );
};

export default MobileGroupSection;
