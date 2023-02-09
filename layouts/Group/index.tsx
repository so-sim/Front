import React from 'react';
import { ARROW } from '../../assets/icons/Arrow';
import { LOGO } from '../../assets/icons/Logo';
import { USER } from '../../assets/icons/User';
import GroupList from './components/GroupList';
import GroupSideBar from './components/SideBar';
import * as Style from './styles';

const Group = () => {
  return (
    <>
      <Style.Header>
        <div>{LOGO.SM}</div>
        <button>
          {USER.PERSON_MD}
          {ARROW.SOLID}
        </button>
      </Style.Header>
      <Style.GridLayout>
        <GroupList />
        <GroupSideBar />
      </Style.GridLayout>
    </>
  );
};

export default Group;
