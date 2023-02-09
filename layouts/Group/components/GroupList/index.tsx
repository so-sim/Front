import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import * as Stlye from './styles';

const Group = [
  { name: '소심한총무', color: '#f86565', id: '1' },
  { name: '소심한총무', color: '#f89a65', id: '2' },
  { name: '소심한총무', color: '#f8e065', id: '3' },
  { name: '소심한총무', color: '#658ef8', id: '4' },
  { name: '소심한총무', color: '#9465f8', id: '5' },
];

const GroupList = () => {
  const param = useParams();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateModal = () => {
    setShowCreateModal((prev) => !prev);
  };

  const isSelected = (id: string) => {
    return param.groupID === id;
  };

  return (
    <>
      <Stlye.Layout>
        {Group.map((group) => (
          <NavLink key={group.id} to={`/group/${group.id}`}>
            <Stlye.Cover isSelected={isSelected(group.id)} />
            <Stlye.EachGroup color={group.color}>
              <span>{group.name.substring(0, 3)}</span>
            </Stlye.EachGroup>
          </NavLink>
        ))}
        <Stlye.CreateButton onClick={handleCreateModal}>{SYSTEM.PLUS_GRAY}</Stlye.CreateButton>
      </Stlye.Layout>
    </>
  );
};

export default GroupList;
