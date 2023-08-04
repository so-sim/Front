import { ARROW } from '@/assets/icons/Arrow';
import { Button, DropBox, Input, Label } from '@/components/@common';
import { GroupColorList } from '@/components/@common/GroupColorList';
import { DROPDOWN_LIST } from '@/constants/Group';
import useGroupForm from '@/hooks/Group/useGroupForm';
import MobileLayout from '@/layouts/Mobile';
import MobileHeader from '@/layouts/Mobile/components/MobileHeader';
import { useNavigate } from 'react-router-dom';

const MobileCreateGroup = () => {
  const {
    groupForm, //
    isError,
    isValidGroupForm,
    createGroupLoading,
    setError,
    getGroupFormAction,
  } = useGroupForm();

  const { handleGroupFormData, createGroup } = getGroupFormAction();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <MobileLayout>
      <MobileHeader title="모임만들기" left={{ icon: ARROW.LEFT_MD, onClick: goBack }} />
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Label title="모임 이름" flexDirection="column">
            <Input
              value={groupForm.title}
              errorText={isError.groupName}
              onChange={(value) => handleGroupFormData('title', value)}
              maxLength={15}
              setError={setError}
              title="groupName"
            />
          </Label>
          <Label title="내 이름" flexDirection="column">
            <Input
              value={groupForm.nickname}
              errorText={isError.nickname}
              onChange={(value) => handleGroupFormData('nickname', value)}
              maxLength={15}
              setError={setError}
              title="nickname"
            />
          </Label>
          <Label title="모임 유형" flexDirection="column">
            <DropBox
              dropDownList={DROPDOWN_LIST}
              type={groupForm.type} //
              setType={(value) => handleGroupFormData('type', value)}
              boxWidth="170px"
              width={170}
            />
          </Label>
          <Label title="커버 색상" flexDirection="column" margin="0px">
            <GroupColorList //
              selectedColor={groupForm.coverColor}
              onChange={(value) => handleGroupFormData('coverColor', value)}
            />
          </Label>
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
    </MobileLayout>
  );
};

export default MobileCreateGroup;
