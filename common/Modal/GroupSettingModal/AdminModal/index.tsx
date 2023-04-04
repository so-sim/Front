import { FC, useEffect, useState } from 'react';
import { Input, Label } from '@/common';
import Button from '@/common/Button';
import Modal from '@/common/Modal';
import { isValid } from '@/utils/validation';
import { GroupColorList } from '../../GroupColorList';
import { DropBox } from '../../../DropBox';
import * as Style from './styles';
import { COLORS, DROPDOWN_LIST } from '@/constants/Group';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useGroupDetail, useUpdateGroup, useWithdrawalGroup } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { GroupColor } from '@/types/group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';

export const AdminModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [type, setType] = useState('');
  const [coverColor, setCoverColor] = useState<GroupColor>('#f89a65');
  const [errorText, setErrorText] = useState('');

  const { groupId } = useParams();

  const { mutate: updateGroupMutate, isError } = useUpdateGroup(setErrorText);
  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();

  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });
  const { data: myNickname } = useGetMyNikname({ groupId: Number(groupId) });

  const updateGroupInfo = () => {
    const id = Number(groupId);
    updateGroupMutate({ title, type, coverColor, groupId: id, nickname });
    modalHandler();
  };

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const isValidForm = () => {
    if (!isValid(title)) return false;
    if (!isValid(nickname)) return false;
    if (type === '') return false;
    if (!COLORS.includes(coverColor)) return false;
    return true;
  };

  useEffect(() => {
    if (!groupData) return;
    if (!myNickname) return;
    setTitle(groupData?.content.title);
    setCoverColor(groupData.content.coverColor);
    setType(groupData.content.groupType);
    setNickname(myNickname.content.nickname);
  }, [groupData?.content.title, myNickname?.content.nickname]);

  return (
    <Modal.Frame onClick={modalHandler} width="492px" height="708px">
      <Modal.Header align="start" onClick={modalHandler}>
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Layout>
          <Style.SubTitle>사용자 설정</Style.SubTitle>
          <Style.Container>
            <Label title="모임 이름" flexDirection="column">
              <Input value={title} isValid={isValid(title)} onChange={setTitle} maxLength={15} />
            </Label>
            <Label title="내 이름" flexDirection="column">
              <Input value={nickname} errorText={errorText} isValid={isValid(nickname) && !isError} onChange={setNickname} maxLength={15} />
            </Label>
            <Label title="모임 유형" flexDirection="column">
              <DropBox dropDownList={DROPDOWN_LIST} type={type} setType={setType} />
            </Label>
            <Label title="커버 색상" flexDirection="column">
              <GroupColorList value={coverColor} onChange={setCoverColor} />
            </Label>
            <Label title="모임 탈퇴" flexDirection="column">
              <Style.WithDrwal>
                <Style.GroupName>{groupData?.content.title}</Style.GroupName>
                <Style.QuitButton onClick={withdrwalGroup}>탈퇴</Style.QuitButton>
              </Style.WithDrwal>
            </Label>
            <Style.Flex>
              <Style.DeleteButton>모임 삭제</Style.DeleteButton>
            </Style.Flex>
          </Style.Container>
        </Style.Layout>
      </Modal.Body>
      <Modal.Footer>
        <Style.ButtonFrame>
          <Button color="white" onClick={modalHandler}>
            취소
          </Button>
          <Button color={isValidForm() ? 'black' : 'disabled'} onClick={updateGroupInfo}>
            저장
          </Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
