import { FC, useEffect, useState } from 'react';
import { Input, Label } from '@/common';
import Button from '@/common/Button';
import Modal from '@/common/Modal';
import { checkCountChar, useError } from '@/utils/validation';
import { GroupColorList } from '../../GroupColorList';
import { DropBox } from '../../../DropBox';
import * as Style from './styles';
import { COLORS, DROPDOWN_LIST } from '@/constants/Group';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useChangeNickname, useDeleteGroup, useGroupDetail, useUpdateGroup, useWithdrawalGroup } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { GroupColor } from '@/types/group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { TwoButtonModal } from '../../TwoButtonModal';
import { GROUP_DELETE, GROUP_WITHDRWWAL_ADMIN } from '@/constants/GroupWithdrawal';
import { OneButtonModal } from '../../OneButtonModal';

export const AdminModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [type, setType] = useState('');
  const [coverColor, setCoverColor] = useState<GroupColor>('#f89a65');
  const [showGroupDeleteModal, setShowGroupDeleteModal] = useState(false);
  const [showGroupWithdrawalModal, setShowGroupWithdrawalModal] = useState(false);
  const [isError, setError] = useError({
    nickname: '',
    groupName: '',
  });

  const { groupId } = useParams();

  const { mutate: updateGroupMutate } = useUpdateGroup();
  const { mutate: updateNickname } = useChangeNickname({ setError, modalHandler });
  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });
  const { data: myNickname } = useGetMyNikname({ groupId: Number(groupId) });

  const handleGroupDeleteModal = () => {
    setShowGroupDeleteModal((prev) => !prev);
  };

  const handleGroupWithdrawalModal = () => {
    setShowGroupWithdrawalModal((prev) => !prev);
  };

  const onDeleteGroup = () => {
    deleteGroup({ groupId: Number(groupId) });
  };

  const isFormValidate = () => {
    return [setError('nickname', checkCountChar(nickname)), setError('groupName', checkCountChar(title))];
  };

  const updateGroupInfo = () => {
    console.log(isFormValidate());
    const id = Number(groupId);
    updateGroupMutate({ title, type, coverColor, groupId: id });
    updateNickname({ nickname, groupId: id });
    modalHandler();
  };

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const isValidForm = () => {
    if (!checkCountChar(title)) return false;
    if (!checkCountChar(nickname)) return false;
    if (type === '') return false;
    if (!COLORS.includes(coverColor)) return false;
    return true;
  };

  const hasMoreUser = groupData?.content.size && groupData?.content.size > 1;
  const hasNoUser = groupData?.content.size && groupData?.content.size <= 1;

  useEffect(() => {
    if (!groupData) return;
    if (!myNickname) return;
    setTitle(groupData?.content.title);
    setCoverColor(groupData.content.coverColor);
    setType(groupData?.content.type);
    setNickname(myNickname.content.nickname);
  }, [groupData?.content.title, myNickname?.content.nickname]);

  return (
    <>
      <Modal.Frame onClick={modalHandler} width="492px" height="708px">
        <Modal.Header align="start" onClick={modalHandler}>
          <Style.Title>모임 설정</Style.Title>
        </Modal.Header>
        <Modal.Body>
          <Style.Layout>
            <Style.SubTitle>사용자 설정</Style.SubTitle>
            <Style.Container>
              <Label title="모임 이름" flexDirection="column">
                <Input value={title} errorText={isError.groupName} onChange={setTitle} maxLength={15} />
              </Label>
              <Label title="내 이름" flexDirection="column">
                <Input value={nickname} errorText={isError.nickname} onChange={setNickname} maxLength={15} />
              </Label>
              <Label title="모임 유형" flexDirection="column">
                <DropBox dropDownList={DROPDOWN_LIST} type={type} setType={setType} boxWidth="170px" />
              </Label>
              <Label title="커버 색상" flexDirection="column">
                <GroupColorList value={coverColor} onChange={setCoverColor} />
              </Label>
              <Label title="모임 탈퇴" flexDirection="column" />
              <Style.WithDrwal>
                <Style.GroupName>{groupData?.content.title}</Style.GroupName>
                <Style.QuitButton onClick={handleGroupWithdrawalModal}>탈퇴</Style.QuitButton>
              </Style.WithDrwal>
              <Style.Flex>
                <Style.DeleteButton onClick={handleGroupDeleteModal}>모임 삭제</Style.DeleteButton>
              </Style.Flex>
            </Style.Container>
          </Style.Layout>
        </Modal.Body>
        <Modal.Footer>
          <Style.ButtonFrame>
            <Button color="white" onClick={modalHandler}>
              취소
            </Button>
            <Button color={isValidForm() ? 'black' : 'disabled'} onClick={updateGroupInfo} id="group_modify">
              저장
            </Button>
          </Style.ButtonFrame>
        </Modal.Footer>
      </Modal.Frame>
      {showGroupWithdrawalModal && hasMoreUser && (
        <OneButtonModal
          width="448px"
          height="265px"
          onClick={handleGroupWithdrawalModal}
          title={GROUP_WITHDRWWAL_ADMIN.HAS_USER.title}
          description={GROUP_WITHDRWWAL_ADMIN.HAS_USER.desc}
          confirm={{ text: '확인', onClick: handleGroupWithdrawalModal }}
        />
      )}
      {showGroupWithdrawalModal && hasNoUser && (
        <TwoButtonModal
          width="448px"
          height="265px"
          onClick={handleGroupWithdrawalModal}
          title={GROUP_WITHDRWWAL_ADMIN.NO_USER.title}
          description={GROUP_WITHDRWWAL_ADMIN.NO_USER.desc}
          cancel={{ text: '취소', onClick: handleGroupWithdrawalModal }}
          confirm={{ text: '모임 탈퇴', onClick: withdrwalGroup }}
        />
      )}
      {showGroupDeleteModal && hasNoUser && (
        <TwoButtonModal
          width="448px"
          height="265px"
          onClick={handleGroupDeleteModal}
          title={GROUP_DELETE.NO_USER.title}
          description={GROUP_DELETE.NO_USER.desc}
          cancel={{ text: '취소', onClick: handleGroupDeleteModal }}
          confirm={{ text: '삭제하기', onClick: onDeleteGroup }}
        />
      )}
      {showGroupDeleteModal && hasMoreUser && (
        <OneButtonModal
          width="448px"
          height="240px"
          onClick={handleGroupDeleteModal}
          title={GROUP_DELETE.HAS_USER.title}
          description={GROUP_DELETE.HAS_USER.desc}
          confirm={{ text: '확인', onClick: handleGroupDeleteModal }}
        />
      )}
    </>
  );
};
