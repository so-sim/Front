import { ARROW } from '@/assets/icons/Arrow';
import { Button } from '@/components/@common';
import useGroupForm from '@/hooks/Group/useGroupForm';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { useNavigate } from 'react-router-dom';
import MobileGroupForm from '@/m-components/MobileGroupForm';

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

  return (
    <>
      <ModalPageLayout title="모임만들기" left={{ icon: ARROW.LEFT_MD, onClick: goBack }}>
        <div style={{ padding: '0 8px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ padding: '20px 12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <MobileGroupForm //
              groupForm={groupForm}
              handleGroupFormData={handleGroupFormData}
              isError={isError}
              setError={setError}
            />
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
    </>
  );
};

export default MobileCreateGroup;
