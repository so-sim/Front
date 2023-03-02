import { useState } from 'react';
import { AddCard } from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import { CreateGroupModal } from '../Modal/CreateGroupModal';
import * as Style from './style';
import React from 'react';
import { GroupColor } from '../../../../constants';

export interface GroupInfo {
  title: string;
  color: GroupColor;
  admin: string;
}

export const CardList = () => {
  const [open, setOpen] = useState(false);

  const groupList: GroupInfo[] = [
    { title: '전국 대한 산악회1', color: 'red', admin: '안녕하세요안녕하세요안녕하세요' },
    { title: '전국 대한 산악회2', color: 'orange', admin: '안녕하세요안녕하세요안녕하세요' },
    { title: '전국 대한 산악회3', color: 'yellow', admin: '안녕하세요안녕하세요안녕하세요' },
    { title: '전국 대한 산악회4', color: 'blue', admin: '안녕하세요안녕하세요안녕하세요' },
    { title: '전국 대한 산악회5', color: 'purple', admin: '안녕하세요안녕하세요안녕하세요' },
    { title: '전국 대한 산악회6', color: 'red', admin: '안녕하세요안녕하세요안녕하세요' },
    { title: '전국 대한 산악회7', color: 'blue', admin: '안녕하세요안녕하세요안녕하세요' },
  ];

  const dealWithModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Style.CardList>
        <AddCard onClick={dealWithModal} />
        {groupList.map((group) => {
          return <GroupCard {...group} key={group.title} />;
        })}
      </Style.CardList>
      <CreateGroupModal isOpen={open} setIsOpen={dealWithModal} />
    </>
  );
};
