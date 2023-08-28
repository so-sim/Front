import { CreateGroupModal } from '@/components/@common/Modal/CreateGroupModal';
import { useGroupList } from '@/queries/Group';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import * as Stlye from './styles';
import { useInView } from 'react-intersection-observer';
import { GA } from '@/constants/GA';
import { isMobile } from 'react-device-detect';

const GroupList = () => {
  const param = useParams();
  const { groupId } = param;
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const devicePath = isMobile ? '/m-group' : '/group';

  const { data: groups, fetchNextPage, hasNextPage } = useGroupList();
  const { ref, inView } = useInView();

  const handleCreateModal = () => {
    if (isMobile) {
      navigate('/m-home/create-group');
      return;
    }
    setShowCreateModal((prev) => !prev);
  };

  const isSelected = (id: number) => {
    return Number(groupId) === id;
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    setShowCreateModal(false);
  }, [location]);

  return (
    <>
      <Stlye.Layout isMobile={isMobile}>
        {groups?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.content?.groupList.map((group) => (
              <Stlye.Groups key={group.groupId} to={`${devicePath}/${group.groupId}/book`}>
                <Stlye.Cover isSelected={isSelected(group.groupId)} />
                <Stlye.EachGroup color={group.coverColor}>
                  <span>{group.title.substring(0, 3)}</span>
                </Stlye.EachGroup>
              </Stlye.Groups>
            ))}
          </React.Fragment>
        ))}

        <Stlye.CreateButton onClick={handleCreateModal} id={GA.CREATE.SIDE_BUTTON}>
          {SYSTEM.PLUS_GRAY}
        </Stlye.CreateButton>
        <div ref={ref} />
        {showCreateModal && <CreateGroupModal modalHandler={handleCreateModal} id={GA.CREATE.SIDE_MODAL} />}
      </Stlye.Layout>
    </>
  );
};

export default GroupList;
