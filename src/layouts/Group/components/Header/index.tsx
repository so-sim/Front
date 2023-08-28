import { logoutUser } from '@/api/Auth';
import { ARROW } from '@/assets/icons/Arrow';
import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/components/@common/DropDown';
import UserConfigModal from '@/components/@common/Modal/UserConfigModal';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Style from './styles';
import { ALARM } from '@/assets/icons/Alarm';
import AlarmComponent from '@/components/Alarm';
import useCheckListState from '@/hooks/useCheckListState';

const DorpDownList = [
  { title: '환경설정', svg: SYSTEM.SETTING_SM },
  { title: '로그아웃', svg: SYSTEM.LOGOUT },
];

type Props = {
  handleSideBar: VoidFunction;
};

const GroupLayoutHeader = ({ handleSideBar }: Props) => {
  const navigate = useNavigate();
  const [dropDownState, setDropDownState] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const {
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

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
    setInitCheckDetailFine();
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
        <Style.Logo>
          <button onClick={handleSideBar}>{SYSTEM.MENU}</button>
          <span onClick={() => navigate('/')}>{LOGO.SM}</span>
        </Style.Logo>

        <Style.UserConfigContainer>
          <AlarmComponent headerHeight={4.25} />
          <Style.UserConfigButton onClick={handleDropDown} ref={dropDownRef}>
            {USER.PERSON_MD}
            {ARROW.SOLID}
            {showDropDown && <DropDown list={DorpDownList} width={90} setState={setDropDownState} onClose={handleDropDown} top={'32px'} dropDownRef={dropDownRef} />}
          </Style.UserConfigButton>
        </Style.UserConfigContainer>
      </Style.Header>
      {showConfigModal && <UserConfigModal handleModal={handelShowConfigModal} />}
    </>
  );
};

export default GroupLayoutHeader;
