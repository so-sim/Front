import { ARROW } from '@/assets/icons/Arrow';
import { Button, Input } from '@/components/@common';
import { GroupColorList } from '@/components/@common/GroupColorList';
import { DROPDOWN_LIST, PLACEHOLDER } from '@/constants/Group';
import useGroupForm from '@/hooks/Group/useGroupForm';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { useNavigate } from 'react-router-dom';
import MobileLabel from '@/m-components/@common/Label';
import MobileDropbox from '@/m-components/@common/Dropbox';
import { useState } from 'react';
import BottomSheet from '@/m-components/BottomSheet';
import * as Style from './styles';

const MobileCreateGroup = () => {
  const {
    groupForm, //
    isError,
    isValidGroupForm,
    createGroupLoading,
    setError,
    getGroupFormAction,
  } = useGroupForm('create');

  const { handleGroupFormData, createGroup } = getGroupFormAction();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [openGroupTypeSheet, setOpenGroupTypeSheet] = useState(false);

  const handleOpenGroupTypeSheet = () => {
    setOpenGroupTypeSheet((prev) => !prev);
  };

  return (
    <>
      <ModalPageLayout title="모임만들기" left={{ icon: ARROW.LEFT_MD, onClick: goBack }}>
        <div style={{ padding: '0 8px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              <div></div>
            </MobileLabel>
            <MobileLabel title="커버 색상">
              <GroupColorList //
                selectedColor={groupForm.coverColor}
                onChange={(value) => handleGroupFormData('coverColor', value)}
              />
            </MobileLabel>
          </div>
          <Button //
            color={isValidGroupForm ? 'primary' : 'disabled'}
            loading={createGroupLoading}
            width="100%"
            height="42px"
            onClick={createGroup}
          >
            만들기
          </Button>
        </div>
      </ModalPageLayout>
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

export default MobileCreateGroup;
