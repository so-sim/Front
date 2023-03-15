import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import DropDown from '@/common/DropDown';
import { useChangeAdmin } from '@/queries/Group';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

interface MemberListItemProps {
  nickname: string;
}

const DropDonwList = [
  { title: '총무 넘기기', svg: SYSTEM.SETTING_SM },
  // { title: '퇴출', svg: SYSTEM.LOGOUT },
];

const MemberListItem: FC<MemberListItemProps> = ({ nickname }) => {
  const isAdmin = false;

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectAction, setSelectAction] = useState('');
  const { groupId } = useParams();

  const { mutate: changeAdminMutate } = useChangeAdmin();

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  useEffect(() => {
    if (selectAction === '총무 넘기기') {
      const id = Number(groupId);
      changeAdminMutate({ nickname, groupId: id });
    }
  }, [selectAction]);

  return (
    <Style.MemberContainer>
      <Style.Flex>
        <div>{USER.PERSON_XL}</div>
        <span>{nickname}</span>
      </Style.Flex>
      {isAdmin && (
        <Style.SVG>
          <div onClick={handleDropDown}>
            {SYSTEM.DOTS}
            {showDropDown && <DropDown list={DropDonwList} top={'30px'} onClose={handleDropDown} setState={setSelectAction} width={104} />}
          </div>
        </Style.SVG>
      )}
    </Style.MemberContainer>
  );
};

export default MemberListItem;
