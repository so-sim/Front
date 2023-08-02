import { FC, useEffect, useState } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from './styles';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { GroupColor } from '@/types/group';
import { GA } from '@/constants/GA';
import { Tab } from '@/components/@common/Tab';
import GroupForm from './GroupForm';
import NotificationForm from './NotifiactionForm';
import useNotificationForm from '@/hooks/admin/useNotificationForm';
import useGroupForm from '@/hooks/admin/useGroupForm';

const TAB_LIST = [
  { label: '사용자 설정', value: 'GROUP' },
  { label: '알림 설정', value: 'ALARM' },
];

export type GroupFormData = {
  title: string;
  nickname: string;
  type: string;
  coverColor: GroupColor;
};

export const AdminModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [tapValue, setTapValue] = useState('GROUP');

  const {
    groupForm, //
    groupInfoLoading,
    isError,
    isValidGroupForm,
    setError,
    getGroupFormAction,
  } = useGroupForm();

  const { updateGroupForm } = getGroupFormAction();

  const {
    notificationForm,
    notificationInfoLoading, //
    getNotificationFormAction,
  } = useNotificationForm();

  const { initNotificationForm, submitNotificationForm } = getNotificationFormAction();

  useEffect(() => {
    if (tapValue === 'GROUP') {
      initNotificationForm();
    }
  }, [tapValue]);

  const handleSubmitForm = () => {
    if (tapValue === 'GROUP') {
      updateGroupForm(modalHandler);
    }
    if (tapValue === 'ALARM') {
      submitNotificationForm(modalHandler);
    }
  };

  const isValidForm = () => {
    if (tapValue === 'GROUP') return isValidGroupForm;
    return true;
  };

  const isLoading = tapValue === 'GROUP' ? groupInfoLoading : notificationInfoLoading;

  return (
    <Modal.Frame onClick={modalHandler} width="492px">
      <Modal.Header align="start" onClick={modalHandler} margin="16px">
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Layout>
          <Tab.Container onChange={setTapValue}>
            <Style.Nav>
              {TAB_LIST.map((tab) => {
                return (
                  <Style.SubTitle //
                    key={tab.value}
                    isSelected={tab.value === tapValue}
                  >
                    <Tab.Element {...tab} />
                  </Style.SubTitle>
                );
              })}
            </Style.Nav>
          </Tab.Container>
          {/* 여기 컨텐츠가 바뀌어야 됨 */}
          {tapValue === 'GROUP' ? (
            <GroupForm //
              groupForm={groupForm}
              getGroupFormAction={getGroupFormAction}
              isError={isError}
              setError={setError}
            />
          ) : (
            <NotificationForm //
              notificationForm={notificationForm}
              getNotificationFormAction={getNotificationFormAction}
            />
          )}
        </Style.Layout>
      </Modal.Body>
      <Modal.Footer>
        <Style.ButtonFrame>
          <Button color="white" onClick={modalHandler}>
            취소
          </Button>
          <Button
            color={isValidForm() ? 'black' : 'disabled'}
            onClick={handleSubmitForm}
            id={GA.GROUP.MODIFY}
            loading={isLoading} //
          >
            저장
          </Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
