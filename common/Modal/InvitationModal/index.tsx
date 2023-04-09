import { FC, useEffect, useState } from 'react';
import Button from '../../Button';
import { Input, Label } from '@/common';
import Modal from '@/common/Modal';
import { PLACEHOLDER } from '@/constants/Group';
import { useError } from '@/utils/validation';
import * as Style from './styles';
import { ModalProps } from '@/common/Modal';
import { useJoinGroup } from '@/queries/Group';
import { useQueryString } from '@/hooks/useQueryString';

interface InvitationModalProps extends Partial<ModalProps> {
  groupName: string;
}

export const InvitationModal: FC<InvitationModalProps> = ({ onClick, groupName }) => {
  const [myName, setMyName] = useState('');
  const { groupId } = useQueryString();
  const [isError, setError] = useError({
    nickname: '',
  });

  const { mutate } = useJoinGroup({ setError, groupId: Number(groupId) });

  const joinGroup = () => {
    mutate({ nickname: myName, groupId: Number(groupId) });
  };

  return (
    <Modal.Frame width="448px" height="262px">
      <Modal.Header onClick={onClick}>
        <Style.Title>{groupName}</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="내 이름">
          <Input placeholder={PLACEHOLDER.NAME} value={myName} errorText={isError.nickname} onChange={setMyName} maxLength={15} title="nickname" setError={setError} />
        </Label>
      </Modal.Body>
      <Modal.Footer>
        <Button color={myName ? 'primary' : 'disabled'} width="100%" height="42px" onClick={joinGroup}>
          입장하기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
