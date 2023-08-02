import * as Style from './styles';
import { FC } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { GroupColorList } from '../../GroupColorList';
import { Input, Label, DropBox } from '@/components/@common';
import { DROPDOWN_LIST, PLACEHOLDER } from '@/constants/Group';
import useGroupForm from '@/hooks/admin/useGroupForm';

export interface ModalHandlerProps {
  modalHandler: () => void;
  id?: string;
}

export const CreateGroupModal: FC<ModalHandlerProps> = ({ modalHandler, id }) => {
  const {
    isError,
    groupForm, //
    isValidGroupForm,
    createGroupLoading,
    setError,
    getGroupFormAction,
  } = useGroupForm();

  const { handleGroupFormData, createGroup } = getGroupFormAction();

  return (
    <Modal.Frame onClick={modalHandler} width="448px" height="446px">
      <Modal.Header onClick={modalHandler}>
        <Style.Title>모임 만들기</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="모임 이름">
          <Input
            placeholder={PLACEHOLDER.GROUP}
            value={groupForm.title}
            errorText={isError.groupName}
            onChange={(value) => handleGroupFormData('title', value)}
            maxLength={15}
            title="groupName"
            setError={setError}
          />
        </Label>
        <Label title="내 이름">
          <Input
            placeholder={PLACEHOLDER.NAME}
            value={groupForm.nickname}
            errorText={isError.nickname}
            onChange={(value) => handleGroupFormData('nickname', value)}
            maxLength={15}
            title="nickname"
            setError={setError}
          />
        </Label>
        <Style.DropDownContainer>
          <Label title="모임 유형">
            <DropBox
              dropDownList={DROPDOWN_LIST}
              type={groupForm.type}
              width={170}
              boxWidth="170px"
              setType={(value) => handleGroupFormData('type', value)} //
            />
          </Label>
        </Style.DropDownContainer>
        <Label title="커버 색상" margin="0px">
          <GroupColorList //
            selectedColor={groupForm.coverColor}
            onChange={(value) => handleGroupFormData('coverColor', value)}
          />
        </Label>
      </Modal.Body>
      <Modal.Footer>
        <Button
          id={id}
          onClick={createGroup} //
          width="100%"
          height="42px"
          color={isValidGroupForm ? 'primary' : 'disabled'}
          loading={createGroupLoading}
        >
          만들기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
