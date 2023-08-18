import { Input } from '@/components/@common';
import { GroupColorList } from '@/components/@common/GroupColorList';
import { DROPDOWN_LIST, PLACEHOLDER } from '@/constants/Group';
import React, { useState } from 'react';
import MobileDropbox from '../@common/Dropbox';
import MobileLabel from '../@common/Label';
import { GroupFormHook, GroupFormAction } from '@/hooks/Group/useGroupForm';
import BottomSheet from '../BottomSheet';
import * as Style from './styles';

type Props = Pick<GroupFormHook, 'groupForm' | 'isError' | 'setError'> & Pick<GroupFormAction, 'handleGroupFormData'>;

const MobileGroupForm = ({ groupForm, isError, handleGroupFormData, setError }: Props) => {
  const [openGroupTypeSheet, setOpenGroupTypeSheet] = useState(false);

  const handleOpenGroupTypeSheet = () => {
    setOpenGroupTypeSheet((prev) => !prev);
  };

  return (
    <>
      <MobileLabel title="모임 이름">
        <Input
          placeholder={PLACEHOLDER.GROUP}
          value={groupForm.title}
          errorText={isError.groupName}
          onChange={(value) => handleGroupFormData('title', value)}
          maxLength={15}
          setError={setError}
          title="groupName"
        />
      </MobileLabel>
      <MobileLabel title="내 이름">
        <Input
          placeholder={PLACEHOLDER.NAME}
          value={groupForm.nickname}
          errorText={isError.nickname}
          onChange={(value) => handleGroupFormData('nickname', value)}
          maxLength={15}
          setError={setError}
          title="nickname"
        />
      </MobileLabel>
      <MobileLabel title="모임 유형" onClick={handleOpenGroupTypeSheet}>
        <MobileDropbox value={groupForm.type} width="170px" />
      </MobileLabel>
      <MobileLabel title="커버 색상">
        <GroupColorList //
          selectedColor={groupForm.coverColor}
          onChange={(value) => handleGroupFormData('coverColor', value)}
        />
      </MobileLabel>
      {openGroupTypeSheet && (
        <BottomSheet title="모임 유형" onClose={handleOpenGroupTypeSheet}>
          <ul>
            {DROPDOWN_LIST.map(({ title }) => {
              return (
                <Style.GroupTypeListItem //
                  key={title}
                  onClick={() => {
                    handleGroupFormData('type', title);
                    handleOpenGroupTypeSheet();
                  }}
                >
                  {title}
                </Style.GroupTypeListItem>
              );
            })}
          </ul>
        </BottomSheet>
      )}
    </>
  );
};

export default MobileGroupForm;
