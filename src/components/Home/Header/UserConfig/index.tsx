import { logoutUser } from '@/api/Auth';
import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/components/@common/DropDown';
import { ConfirmModal } from '@/components/@common/Modal/ConfirmModal';
import UserConfigModal from '@/components/@common/Modal/UserConfigModal';
import { useEffect, useRef, useState } from 'react';
import * as Style from './style';

const UserConfig = () => {
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

  const DorpDownList = [
    { title: '환경설정', svg: SYSTEM.SETTING_SM },
    { title: '로그아웃', svg: SYSTEM.LOGOUT },
  ];

  return (
    <>
      <Style.UserConfig>
        <Style.UserConfigButton onClick={handleDropDown} ref={dropDownRef} style={{ display: 'flex', alignItems: 'center' }}>
          {USER.PERSON_MD}
          {ARROW.SOLID}
          {showDropDown && <DropDown list={DorpDownList} width={90} setState={setDropDownState} onClose={handleDropDown} top={'32px'} dropDownRef={dropDownRef} />}
        </Style.UserConfigButton>
      </Style.UserConfig>
      {showLogOutModal && (
        <ConfirmModal
          title="로그아웃"
          description="로그아웃 하시겠습니까?"
          modalHandler={handleShowLogOutmodal}
          cancel={{ text: '취소', onClick: handleShowLogOutmodal }}
          confirm={{ text: '로그아웃', onClick: onClickLogOut }}
        />
      )}
      {showConfigModal && <UserConfigModal handleModal={handelShowConfigModal} />}
    </>
  );
};

export default UserConfig;
