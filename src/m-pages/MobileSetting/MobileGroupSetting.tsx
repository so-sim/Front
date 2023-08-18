import { ARROW } from '@/assets/icons/Arrow';
import { Button } from '@/components/@common';
import useGroupForm from '@/hooks/Group/useGroupForm';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import MobileLabel from '@/m-components/@common/Label';
import MobileGroupForm from '@/m-components/MobileGroupForm';
import { useGroupDetail } from '@/queries/Group';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Style from './styles';

const MobileGroupSetting = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  const {
    groupForm, //
    groupInfoLoading,
    isError,
    setError,
    getGroupFormAction,
  } = useGroupForm('update');

  const { data: groupData } = useGroupDetail(Number(groupId));

  const { updateGroupForm, handleGroupFormData, deleteGroup, withdrwalGroup } = getGroupFormAction();

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="모임 설정">
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 8px', height: '100%' }}>
        <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MobileGroupForm //
            groupForm={groupForm}
            handleGroupFormData={handleGroupFormData}
            isError={isError}
            setError={setError}
          />
          <MobileLabel title="모임 탈퇴">
            <Style.WithDrwal>
              <Style.GroupTitle>{groupData?.content.title}</Style.GroupTitle>
              <Style.QuitButton onClick={withdrwalGroup}>탈퇴</Style.QuitButton>
            </Style.WithDrwal>
          </MobileLabel>
          <Style.DeleteButton onClick={deleteGroup}>모임 삭제</Style.DeleteButton>
        </div>
        <div style={{ display: 'flex', gap: '12px', width: '100%', marginBottom: '20px' }}>
          <Button color="white" width="100%" height="42px" onClick={goBack}>
            취소
          </Button>
          <Button color="black" width="100%" height="42px" loading={groupInfoLoading} onClick={updateGroupForm}>
            저장
          </Button>
        </div>
      </div>
    </ModalPageLayout>
  );
};

export default MobileGroupSetting;
