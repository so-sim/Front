import { removeAccessToken } from '@/api';
import { ARROW } from '@/assets/icons/Arrow';
import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/common/DropDown';
import { TwoButtonModal } from '@/common/Modal/TwoButtonModal';
import UserConfigModal from '@/common/Modal/UserConfigModal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Style from './styles';

const DorpDownList = [
  { title: '환경설정', svg: SYSTEM.SETTING_SM },
  { title: '로그아웃', svg: SYSTEM.LOGOUT },
];

const GroupLayoutHeader = () => {
  const navigate = useNavigate();
  const [dropDownState, setDropDownState] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const handelShowConfigModal = () => {
    setShowConfigModal((prev) => !prev);
  };
  const handleShowLogOutmodal = () => {
    setShowLogOutModal((prev) => !prev);
  };

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const onClickLogOut = () => {
    removeAccessToken();
    navigate('/');
  };

  useEffect(() => {
    if (dropDownState === '환경설정') handelShowConfigModal();
    if (dropDownState === '로그아웃') handleShowLogOutmodal();
    setDropDownState('');
  }, [dropDownState]);

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
      {showLogOutModal && (
        <TwoButtonModal
          title="로그아웃"
          description="로그아웃 하시겠습니까?"
          onClick={handleShowLogOutmodal}
          firstBtn={{ text: '취소', onClick: handleShowLogOutmodal }}
          secondBtn={{ text: '로그아웃', onClick: onClickLogOut }}
        />
      )}
      {showConfigModal && <UserConfigModal handleModal={handelShowConfigModal} />}
    </>
  );
};

export default GroupLayoutHeader;
