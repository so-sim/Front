import * as Style from './styles';
import { FC, useEffect, useState } from 'react';
import Button from '@/common/Button';
import Modal from '@/common/Modal';
import { GroupColorList } from '../GroupColorList';
import { Input, Label } from '@/common';
import { DropBox } from '../../DropBox';
import { checkCountChar } from '@/utils/validation';
import { COLORS, DROPDOWN_LIST, PLACEHOLDER } from '@/constants/Group';
import { useCreateGroup } from '@/queries/Group';
import { GroupColor } from '@/types/group';
import { userState } from '@/store/userState';
import { useRecoilValue } from 'recoil';

export interface ModalHandlerProps {
  modalHandler: () => void;
  id?: string;
}

export const CreateGroupModal: FC<ModalHandlerProps> = ({ modalHandler, id }) => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [type, setType] = useState('');
  const [coverColor, setCoverColor] = useState<GroupColor>('#f86565');
  const [isInit, setIsInit] = useState({
    groupName: true,
    myName: true,
  });

  useEffect(() => {
    if (title !== '' && isInit.groupName === true) setIsInit((prev) => ({ ...prev, groupName: false }));
    if (nickname !== '' && isInit.myName === true) setIsInit((prev) => ({ ...prev, myName: false }));
  }, [title, nickname]);

  const { mutate } = useCreateGroup(modalHandler);

  const createGroup = () => {
    mutate({ title, type, coverColor, nickname });
  };

  const isValidForm = (): boolean => {
    if (!checkCountChar(title)) return false;
    if (!checkCountChar(nickname)) return false;
    if (type === '') return false;
    if (!COLORS.includes(coverColor)) return false;
    return true;
  };

  return (
    <Modal.Frame onClick={modalHandler} width="448px" height="446px">
      <Modal.Header onClick={modalHandler}>
        <Style.Title>모임 만들기</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="모임 이름">
          <Input placeholder={PLACEHOLDER.GROUP} value={title} errorText={checkCountChar(title)} onChange={setTitle} maxLength={15} />
        </Label>
        <Label title="내 이름">
          <Input placeholder={PLACEHOLDER.NAME} value={nickname} errorText={checkCountChar(nickname)} onChange={setNickname} maxLength={15} />
        </Label>
        <div style={{ position: 'relative' }}>
          <Label title="모임 유형">
            <DropBox dropDownList={DROPDOWN_LIST} type={type} setType={setType} color="gray" width={170} boxWidth="170px" />
          </Label>
        </div>
        <Label title="커버 색상">
          <GroupColorList value={coverColor} onChange={setCoverColor} />
        </Label>
      </Modal.Body>
      <Modal.Footer>
        <Button id={id} onClick={createGroup} width="100%" height="42px" color={isValidForm() ? 'primary' : 'disabled'}>
          만들기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
