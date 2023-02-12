import React, { useState } from 'react';
import Button from '../../../../../common/Button';
import { Input } from '../../../../../common/Input';
import { Label } from '../../../../../common/Label';
import Modal from '../../../../../common/Modal';
import theme from '../../../../../styles/Theme';
import { GroupColorList } from '../GroupColorList';
import { QuitGroup } from '../QuitGroup';
import * as Style from './style';

export const AdminModal = () => {
  const [form, setForm] = useState({
    groupName: '',
    myName: '',
    type: '',
    color: 'red',
  });

  return (
    <Modal.Frame isOpen={true} onClick={() => console.log('hi')} width="492px" height="652px">
      <Modal.Header onClick={() => console.log('hi')}>
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>사용자 설정</div>
          <div style={{ width: '100%', borderLeft: `2px solid ${theme.colors.neutral_400_b}`, paddingLeft: '16px' }}>
            <Label title="모임이름" flexDirection="column">
              <Input value={form} onChange={setForm} type="groupName" isValid={false} maxLength={10} />
            </Label>
            <Label title="내 이름" flexDirection="column">
              <Input value={form} onChange={setForm} type="myName" isValid={false} maxLength={20} />
            </Label>
            <Label title="커버 색상" flexDirection="column">
              <GroupColorList value={form} onChange={setForm} type="color" />
            </Label>
            <Label title="모임 탈퇴" flexDirection="column">
              <QuitGroup />
            </Label>
            <Style.DeleteButton>모임 삭제</Style.DeleteButton>
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
