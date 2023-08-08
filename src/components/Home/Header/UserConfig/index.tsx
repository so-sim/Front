import { logoutUser } from '@/api/Auth';
import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/components/@common/DropDown';
import UserConfigModal from '@/components/@common/Modal/UserConfigModal';
import AlarmComponent from '@/components/Alarm';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import * as Style from './style';

const UserConfig = () => {
  const [dropDownState, setDropDownState] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const dropDownRef = useRef<HTMLButtonElement>(null);

  const handelShowConfigModal = () => {
    setShowConfigModal((prev) => !prev);
  };
  const handleShowLogOutmodal = () => {
    openConfirmModal({
      type: 'LOGOUT',
      confirm: onClickLogOut,
      cancel: closeConfirmModal,
    });
  };

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const onClickLogOut = () => {
    logoutUser();
  };

  useEffect(() => {
    if (dropDownState === '환경설정') {
      if (isMobile) {
        return navigate('/m-setting');
      }
      handelShowConfigModal();
    }
    if (dropDownState === '로그아웃') handleShowLogOutmodal();
    setDropDownState('');
  }, [dropDownState]);

  const DorpDownList = [
    { title: '환경설정', svg: SYSTEM.SETTING_SM },
    { title: '로그아웃', svg: SYSTEM.LOGOUT },
  ];

  return (
    <>
      <Style.Container>
        <AlarmComponent headerHeight={5.5} />
        <Style.UserConfig>
          <Style.UserConfigButton onClick={handleDropDown} ref={dropDownRef} style={{ display: 'flex', alignItems: 'center' }}>
            {USER.PERSON_MD}
            {ARROW.SOLID}
            {showDropDown && <DropDown list={DorpDownList} width={90} setState={setDropDownState} onClose={handleDropDown} top={'32px'} dropDownRef={dropDownRef} />}
          </Style.UserConfigButton>
        </Style.UserConfig>
      </Style.Container>
      {showConfigModal && <UserConfigModal handleModal={handelShowConfigModal} />}
    </>
  );
};

export default UserConfig;
