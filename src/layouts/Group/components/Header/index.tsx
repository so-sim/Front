import { logoutUser } from '@/api/Auth';
import { ARROW } from '@/assets/icons/Arrow';
import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/components/@common/DropDown';
import { ConfirmModal } from '@/components/@common/Modal/ConfirmModal';
import UserConfigModal from '@/components/@common/Modal/UserConfigModal';
import { LOGOUT } from '@/constants/Auth';
import { userState } from '@/store/userState';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as Style from './styles';

const DorpDownList = [
  { title: '환경설정', svg: SYSTEM.SETTING_SM },
  { title: '로그아웃', svg: SYSTEM.LOGOUT },
];

const GroupLayoutHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [dropDownState, setDropDownState] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownRef = useRef<HTMLButtonElement>(null);

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
    logoutUser();
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
        <Style.UserConfigButton onClick={handleDropDown} ref={dropDownRef}>
          {USER.PERSON_MD}
          {ARROW.SOLID}
          {showDropDown && <DropDown list={DorpDownList} width={90} setState={setDropDownState} onClose={handleDropDown} top={'32px'} dropDownRef={dropDownRef} />}
        </Style.UserConfigButton>
      </Style.Header>
      {showLogOutModal && (
        <ConfirmModal
          title={LOGOUT.title}
          description={LOGOUT.description}
          modalHandler={handleShowLogOutmodal}
          cancel={{ text: '취소', onClick: handleShowLogOutmodal }}
          confirm={{ text: '로그아웃', onClick: onClickLogOut }}
        />
      )}
      {showConfigModal && <UserConfigModal handleModal={handelShowConfigModal} />}
    </>
  );
};

export default GroupLayoutHeader;
