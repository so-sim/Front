import { FC, useState } from 'react';
import Button from '../../Button';
import { Input, Label } from '@/components/@common';
import Modal from '@/components/@common/Modal';
import { PLACEHOLDER } from '@/constants/Group';
import { useError } from '@/utils/validation';
import * as Style from './styles';
import { ModalProps } from '@/components/@common/Modal';
import { useJoinGroup } from '@/queries/Group';
import { useQueryString } from '@/hooks/useQueryString';
import { isMobile } from 'react-device-detect';

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
    <Modal.Frame width={isMobile ? '328px' : '448px'} height={isMobile ? '278px' : '262px'}>
      <Modal.Header onClick={onClick} margin={isMobile ? '12px' : '20px'}>
        <Style.Title $isMobile={isMobile}>{groupName}</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="내 이름" margin="0px" flexDirection={isMobile ? 'column' : 'row'} $isMobile={isMobile}>
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
