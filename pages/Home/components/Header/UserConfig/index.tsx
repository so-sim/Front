import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/common/DropDown';
import { TwoButtonModal } from '@/common/Modal/TwoButtonModal';
import UserConfigModal from '@/common/Modal/UserConfigModal';
import { GroupListWithIndex } from '@/types/group';
import { removeAccessToken } from '@/utils/acceessToken';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const queryClient = useQueryClient();

  const onClickLogOut = () => {
    removeAccessToken();
    localStorage.removeItem('recoil-persist');
    queryClient.setQueryData<GroupListWithIndex>(['groupList'], {
      next: false,
      index: 0,
      groupList: [],
    });
    window.location.href = process.env.REACT_APP_SERVICE_URL as string;
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
      <div style={{ position: 'relative', display: 'flex' }}>
        <button onClick={handleDropDown} ref={dropDownRef}>
          {USER.PERSON_MD}
          {ARROW.SOLID}
          {showDropDown && <DropDown list={DorpDownList} width={112} setState={setDropDownState} onClose={handleDropDown} top={'32px'} dropDownRef={dropDownRef} />}
        </button>
      </div>
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

export default UserConfig;
