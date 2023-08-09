import { ARROW } from '@/assets/icons/Arrow';
import { Button } from '@/components/@common';
import GroupForm from '@/components/@common/Modal/GroupSettingModal/AdminModal/GroupForm';
import useGroupForm from '@/hooks/Group/useGroupForm';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MobileGroupSetting = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const {
    groupForm, //
    groupInfoLoading,
    isError,
    setError,
    getGroupFormAction,
  } = useGroupForm();

  const { updateGroupForm } = getGroupFormAction();

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="모임 설정">
      <div style={{ marginTop: '20px', height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ padding: '0 12px' }}>
          <GroupForm //
            groupForm={groupForm}
            getGroupFormAction={getGroupFormAction}
            isError={isError}
            setError={setError}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <Button color="white" width="100%" height="42px">
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
