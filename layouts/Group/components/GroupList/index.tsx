import { CreateGroupModal } from '@/common/Modal/CreateGroupModal';
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import * as Stlye from './styles';

const Group = [
  { title: '테스1', coverColor: '#f86565', groupId: '1' },
  { title: '테스2', coverColor: '#f89a65', groupId: '2' },
  { title: '테스3', coverColor: '#f8e065', groupId: '3' },
  { title: '테스4', coverColor: '#658ef8', groupId: '4' },
  { title: '테스5', coverColor: '#9465f8', groupId: '5' },
];

const GroupList = () => {
  const param = useParams();
  const { groupId } = param;
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateModal = () => {
    setShowCreateModal((prev) => !prev);
  };

  const isSelected = (id: string) => {
    return groupId === id;
  };

  return (
    <>
      <Stlye.Layout>
        {Group.map((group) => (
          <NavLink key={group.groupId} to={`/group/${group.groupId}/book`}>
            <Stlye.Cover isSelected={isSelected(group.groupId)} />
            <Stlye.EachGroup color={group.coverColor}>
              <span>{group.title.substring(0, 3)}</span>
            </Stlye.EachGroup>
          </NavLink>
        ))}
        <Stlye.CreateButton onClick={handleCreateModal}>{SYSTEM.PLUS_GRAY}</Stlye.CreateButton>
      </Stlye.Layout>
      {showCreateModal && <CreateGroupModal modalHandler={handleCreateModal} />}
    </>
  );
};

export default GroupList;
