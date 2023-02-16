import React, { useState } from 'react';
import { Label } from '../../../../../common/Label';
import Modal from '../../../../../common/Modal';
import { GroupDropDown } from '../GroupDropDown';
import * as Style from './styles';

export const FineBookModal = () => {
  const [openDrop, setOpenDrop] = useState(false);
  const [member, setMember] = useState('');

  const memberList = [
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
  ];

  return (
    <Modal.Frame width="448px" height="412px" isOpen={true} onClick={() => console.log('hi')}>
      <Modal.Header onClick={() => console.log('hi')}>상세 내역 수정</Modal.Header>
      <Label title="팀원">
        <GroupDropDown width={304} setType={setMember} type={member} dropDownList={memberList} openDrop={openDrop} setOpenDrop={setOpenDrop} />
      </Label>
    </Modal.Frame>
  );
};
