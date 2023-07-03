import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/components/@common/DropDown';
import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useChangeAdmin, useGroupDetail } from '@/queries/Group';
import { FC, useEffect, useRef, useState } from 'react';
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
  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectAction, setSelectAction] = useState('');
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };
  const handleShowChangeAdminModal = () => {
    openConfirmModal({
      type: 'CHANGE_ADMIN',
      confirm: onClickConfirm,
      cancel: closeConfirmModal,
      id: GA.TOSS_MANAGER.MODAL,
    });
  };

  const { mutate: changeAdminMutate } = useChangeAdmin(Number(groupId));

  const onClickConfirm = () => {
    const id = Number(groupId);
    changeAdminMutate({ groupId: id, nickname });
  };

  useEffect(() => {
    if (selectAction === '총무 넘기기') {
      handleShowChangeAdminModal();
    }
    setSelectAction('');
  }, [selectAction]);

  return (
    <Style.MemberContainer>
      <Style.Flex>
        <div>{USER.PERSON_XL}</div>
        <Style.Nickname>{nickname}</Style.Nickname>
      </Style.Flex>
      {isAdmin && (
        <Style.SVG ref={dropDownRef}>
          <div onClick={handleDropDown}>
            {SYSTEM.DOTS}
            {showDropDown && <DropDown list={DropDonwList} top={'30px'} onClose={handleDropDown} setState={setSelectAction} width={114} dropDownRef={dropDownRef} />}
          </div>
        </Style.SVG>
      )}
    </Style.MemberContainer>
  );
};

export default MemberListItem;
