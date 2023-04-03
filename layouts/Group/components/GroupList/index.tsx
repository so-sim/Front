import { CreateGroupModal } from '@/common/Modal/CreateGroupModal';
import { useGroupList } from '@/queries/Group';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import * as Stlye from './styles';
import { useInView } from 'react-intersection-observer';

const GroupList = () => {
  const param = useParams();
  const { groupId } = param;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: groups, fetchNextPage, hasNextPage } = useGroupList();
  const { ref, inView } = useInView();

  const handleCreateModal = () => {
    setShowCreateModal((prev) => !prev);
  };

  const isSelected = (id: number) => {
    return Number(groupId) === id;
  };

  console.log(groups);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Stlye.Layout>
        {groups?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.content.groupList.map((group) => (
              <Stlye.Groups key={group.groupId} to={`/group/${group.groupId}/book`}>
                <Stlye.Cover isSelected={isSelected(group.groupId)} />
                <Stlye.EachGroup color={group.coverColor}>
                  <span>{group.title.substring(0, 3)}</span>
                </Stlye.EachGroup>
              </Stlye.Groups>
            ))}
          </React.Fragment>
        ))}
        <div ref={ref} />
        <Stlye.CreateButton onClick={handleCreateModal}>{SYSTEM.PLUS_GRAY}</Stlye.CreateButton>
      </Stlye.Layout>
      {showCreateModal && <CreateGroupModal modalHandler={handleCreateModal} />}
    </>
  );
};

export default GroupList;
