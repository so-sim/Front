import React, { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ARROW } from '../../assets/icons/Arrow';
import { LOGO } from '../../assets/icons/Logo';
import { SYSTEM } from '../../assets/icons/System';
import { USER } from '../../assets/icons/User';
import DropDown from '../../common/DropDown';
import FineBook from '../../pages/FineBook';
import Calendar from '../../pages/WholeCalendar';
import GroupList from './components/GroupList';
import GroupSideBar from './components/SideBar';
import * as Style from './styles';

const DorpDownList = [
  { title: '환경설정', svg: SYSTEM.SETTING_SM },
  { title: '로그아웃', svg: SYSTEM.LOGOUT },
];

const GroupLayout = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { groupID } = param;
  const [dropDownState, setDropDownState] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  return (
    <>
      <Style.Header>
        <span onClick={() => navigate('/')}>{LOGO.SM}</span>
        <button onClick={handleDropDown}>
          {USER.PERSON_MD}
          {ARROW.SOLID}
          {showDropDown && <DropDown list={DorpDownList} width={112} setState={setDropDownState} onClose={handleDropDown} top={'32px'} />}
        </button>
      </Style.Header>
      <Style.GridLayout>
        <GroupList />
        <GroupSideBar />
        <Routes>
          <Route path={`/book`} element={<Calendar />} />
          <Route path={`/book/detail`} element={<FineBook />} />
        </Routes>
      </Style.GridLayout>
    </>
  );
};

export default GroupLayout;
