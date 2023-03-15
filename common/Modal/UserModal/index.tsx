import React, { useState } from 'react';
import Button from '@/common/Button';
import { Input } from '@/common/Input';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import theme from '@/styles/Theme';
import { isValid } from '@/utils/validation';
import { QuitGroup } from '../QuitGroup';
import * as Style from './style';

export const UserModal = () => {
  const [myName, setMyName] = useState('');

  return (
    <Modal.Frame isOpen={true} onClick={() => console.log('hi')} width="492px" height="360px">
      <Modal.Header onClick={() => console.log('hi')}>
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>사용자 설정</div>
          <div style={{ width: '100%', borderLeft: `2px solid ${theme.colors.neutral_400_b}`, paddingLeft: '16px' }}>
            <Label title="내 이름" flexDirection="column">
              <Input value={myName} isValid={isValid(myName, 2, 20)} onChange={setMyName} maxLength={20} />
            </Label>
            <Label title="모임 탈퇴" flexDirection="column">
              <QuitGroup />
            </Label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Style.ButtonFrame>
          <Button color="white">취소</Button>
          <Button color="black">저장</Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
