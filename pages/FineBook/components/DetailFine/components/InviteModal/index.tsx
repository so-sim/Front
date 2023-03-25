import { FC } from 'react';
import Button from '@/common/Button';
import Modal from '@/common/Modal';
import * as Style from './styles';
import { ModalProps } from '@/common/Modal';
import { SYSTEM } from '@/assets/icons/System';
import { useParams } from 'react-router-dom';
import { copyInvitationLink } from '@/utils/copyInvitationLink';

export const InviteModal: FC<Partial<ModalProps>> = ({ onClick }) => {
  const { groupId } = useParams();

  return (
    <Modal.Frame width="448px" height="264px">
      <Modal.Header onClick={onClick}>
        <Style.Title>초대하기</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Text>
          모임이 만들어졌습니다.
          <br /> 다른 팀원들을 초대해 보세요!
        </Style.Text>
      </Modal.Body>
      <div style={{ height: '12px' }} />
      <Modal.Footer>
        <Button color="primary" width="100%" leftIcon={SYSTEM.LINK} height="42px" onClick={() => copyInvitationLink(Number(groupId))}>
          초대링크 복사하기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
