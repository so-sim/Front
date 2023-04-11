import { ARROW } from '@/assets/icons/Arrow';
import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/common/DropDown';
import { AuthModal } from '@/common/Modal/LoginModal';
import { TwoButtonModal } from '@/common/Modal/TwoButtonModal';
import UserConfigModal from '@/common/Modal/UserConfigModal';
import { userState } from '@/store/userState';
import { GroupListWithIndex } from '@/types/group';
import { removeAccessToken } from '@/utils/acceessToken';
import { useQueryClient } from '@tanstack/react-query';
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

  const queryClient = useQueryClient();

  const onClickLogOut = () => {
    removeAccessToken();
    setUser({
      userId: null,
      email: '',
    });

    queryClient.setQueryData<GroupListWithIndex>(['groupList'], {
      next: false,
      index: 0,
      groupList: [],
    });
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
        <Style.UserConfigButton onClick={handleDropDown} ref={dropDownRef}>
          {USER.PERSON_MD}
          {ARROW.SOLID}
          {showDropDown && <DropDown list={DorpDownList} width={90} setState={setDropDownState} onClose={handleDropDown} top={'32px'} dropDownRef={dropDownRef} />}
        </Style.UserConfigButton>
      </Style.Header>
      {showLogOutModal && (
        <TwoButtonModal
          title="로그아웃"
          description="로그아웃 하시겠습니까?"
          onClick={handleShowLogOutmodal}
          cancel={{ text: '취소', onClick: handleShowLogOutmodal }}
          confirm={{ text: '로그아웃', onClick: onClickLogOut }}
        />
      )}
      {showConfigModal && <UserConfigModal handleModal={handelShowConfigModal} />}
    </>
  );
};

export default GroupLayoutHeader;
