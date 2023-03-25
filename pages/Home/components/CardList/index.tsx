import { useState } from 'react';
import { AddCard } from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import { CreateGroupModal } from '@/common/Modal/CreateGroupModal';
import * as Style from './styles';
import { useGroupList } from '@/queries/Group/';

export const CardList = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { data } = useGroupList(index);

  const dealWithModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Style.CardList>
        <AddCard onClick={dealWithModal} />
        {data?.content.groupList.map((group) => {
          return <GroupCard {...group} key={group.groupId} />;
        })}
      </Style.CardList>
      {open && <CreateGroupModal modalHandler={dealWithModal} />}
    </>
  );
};
