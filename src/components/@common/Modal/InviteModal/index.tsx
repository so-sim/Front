import { FC } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from './styles';
import { ModalProps } from '@/components/@common/Modal';
import { SYSTEM } from '@/assets/icons/System';
import { GA } from '@/constants/GA';
import { isMobile } from 'react-device-detect';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useCopyInvitationLink from '@/hooks/useCopyInvitationLink';

const InviteModal: FC<Partial<ModalProps>> = ({ onClick }) => {
  const { invitationLink, onSuccessCopy } = useCopyInvitationLink();

  return (
    <Modal.Frame width={isMobile ? '328px' : '448px'} height={isMobile ? '244px' : '264px'} onClick={onClick}>
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
        <CopyToClipboard text={invitationLink} onCopy={onSuccessCopy}>
          <Button
            color="primary"
            width="100%"
            leftIcon={SYSTEM.LINK}
            height="42px" //
            // onClick={() => copyInvitationLink(Number(groupId))}
            id={GA.INVITATION.MODAL}
          >
            <span>초대링크 복사하기</span>
          </Button>
        </CopyToClipboard>
      </Modal.Footer>
    </Modal.Frame>
  );
};
export default InviteModal;
