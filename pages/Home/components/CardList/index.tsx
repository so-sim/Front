import { useState } from 'react';
import { AddCard } from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import { CreateGroupModal } from '../Modal/CreateGroupModal';
import * as Style from './style';
import { useGroupList } from '@/queries/Group/';

export const CardList = () => {
  const [open, setOpen] = useState(false);

  const { data } = useGroupList();

  const dealWithModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Style.CardList>
        <AddCard onClick={dealWithModal} />
        {data?.content.map((group) => {
          return <GroupCard {...group} key={group.title} />;
        })}
      </Style.CardList>
      <CreateGroupModal isOpen={open} setIsOpen={dealWithModal} />
    </>
  );
};
