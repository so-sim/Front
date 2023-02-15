import React, { useState } from 'react';
import Button from '../../../../../common/Button';
import { Input } from '../../../../../common/Input';
import { Label } from '../../../../../common/Label';
import Modal from '../../../../../common/Modal';
import theme from '../../../../../styles/Theme';
import { isValid } from '../../../../../utils/validation';
import { GroupColorList } from '../GroupColorList';
import { GroupDropDown } from '../GroupDropDown';
import { QuitGroup } from '../QuitGroup';
import * as Style from './style';

export const AdminModal = () => {
  const [openDrop, setOpenDrop] = useState(false);

  const [groupName, setGroupName] = useState('');
  const [myName, setMyName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('red');
  const dropDownList = [
    { title: '학교, 교내/외 모임' },
    { title: '회사, 사내 모임' },
    { title: '취미, 동호회 모임' },
    { title: '친구, 사모임' },
    { title: '프로젝트' },
    { title: '기타' },
  ];

  return (
    <Modal.Frame isOpen={true} onClick={() => console.log('hi')} width="492px" height="708px">
      <Modal.Header onClick={() => console.log('hi')}>
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>사용자 설정</div>
          <div style={{ width: '100%', borderLeft: `2px solid ${theme.colors.neutral_400_b}`, paddingLeft: '16px' }}>
            <Label title="모임 이름" flexDirection="column">
              <Input value={groupName} isValid={isValid(groupName, 2, 10)} onChange={setGroupName} maxLength={10} />
            </Label>
            <Label title="내 이름" flexDirection="column">
              <Input value={myName} isValid={isValid(myName, 2, 20)} onChange={setMyName} maxLength={20} />
            </Label>
            <Label title="모임 유형" flexDirection="column">
              <GroupDropDown dropDownList={dropDownList} type={type} openDrop={openDrop} setOpenDrop={setOpenDrop} setType={setType} />
            </Label>
            <Label title="커버 색상" flexDirection="column">
              <GroupColorList value={color} onChange={setColor} />
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
