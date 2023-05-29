import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/components/@common/DropDown';
import { ConfirmModal } from '@/components/@common/Modal/ConfirmModal';
import { GA } from '@/constants/GA';
import { useChangeAdmin, useGroupDetail } from '@/queries/Group';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

interface MemberListItemProps {
  nickname: string;
}

const DropDonwList = [
  { title: '총무 넘기기', svg: SYSTEM.SETTING_SM, id: GA.TOSS_MANAGER.BUTTON },
  // { title: '퇴출', svg: SYSTEM.LOGOUT },
];

const MemberListItem: FC<MemberListItemProps> = ({ nickname }) => {
  const { groupId } = useParams();
  const { data: groupData } = useGroupDetail(Number(groupId));

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectAction, setSelectAction] = useState('');
  const [showChangeAdminModal, setShowChangeAdminModal] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };
  const handleShowChangeAdminModal = () => {
    setShowChangeAdminModal((prev) => !prev);
  };

  const { mutate: changeAdminMutate } = useChangeAdmin(Number(groupId));

  const onClickConfirm = () => {
    const id = Number(groupId);
    changeAdminMutate({ groupId: id, nickname });
    handleShowChangeAdminModal();
  };

  useEffect(() => {
    if (selectAction === '총무 넘기기') {
      handleShowChangeAdminModal();
    }
    setSelectAction('');
  }, [selectAction]);

  return (
    <>
      <Style.MemberContainer>
        <Style.Flex>
          <div>{USER.PERSON_XL}</div>
          <Style.Nickname>{nickname}</Style.Nickname>
        </Style.Flex>
        {groupData?.content.isAdmin && (
          <Style.SVG ref={dropDownRef}>
            <div onClick={handleDropDown}>
              {SYSTEM.DOTS}
              {showDropDown && <DropDown list={DropDonwList} top={'30px'} onClose={handleDropDown} setState={setSelectAction} width={114} dropDownRef={dropDownRef} />}
            </div>
          </Style.SVG>
        )}
      </Style.MemberContainer>
      {showChangeAdminModal && (
        <ConfirmModal
          type="CHANGE_ADMIN"
          width="448px"
          modalHandler={handleShowChangeAdminModal}
          cancel={handleShowChangeAdminModal}
          confirm={onClickConfirm}
          id={GA.TOSS_MANAGER.MODAL}
        />
      )}
    </>
  );
};

export default MemberListItem;
