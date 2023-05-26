import { FC, useEffect, useState } from 'react';
import { Input, Label } from '@/components/@common';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { checkCountChar, useError } from '@/utils/validation';
import { GroupColorList } from '../../../GroupColorList';
import { DropBox } from '@/components/@common';
import * as Style from './styles';
import { COLORS, DROPDOWN_LIST } from '@/constants/Group';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useDeleteGroup, useGroupDetail, useUpdateGroup, useWithdrawalGroup } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { GroupColor } from '@/types/group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { ConfirmModal } from '../../ConfirmModal';
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

  const { mutate: updateGroupMutate, isLoading } = useUpdateGroup({ setError, modalHandler });
  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  const { data: groupData } = useGroupDetail(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));

  const handleGroupDeleteModal = () => {
    setShowGroupDeleteModal((prev) => !prev);
  };

  const handleGroupWithdrawalModal = () => {
    setShowGroupWithdrawalModal((prev) => !prev);
  };

  const onDeleteGroup = () => {
    deleteGroup({ groupId: Number(groupId) });
  };

  const updateGroupInfo = () => {
    const id = Number(groupId);
    updateGroupMutate({ title, type, coverColor, groupId: id, nickname: myNickname?.content.nickname === nickname ? null : nickname });
  };

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const isValidForm = () => {
    if (checkCountChar(title)) return false;
    if (checkCountChar(nickname)) return false;
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
        <Modal.Header align="start" onClick={modalHandler} margin="16px">
          <Style.Title>모임 설정</Style.Title>
        </Modal.Header>
        <Modal.Body>
          <Style.Layout>
            <Style.SubTitle>사용자 설정</Style.SubTitle>
            <Style.Container>
              <div>
                <Label title="모임 이름" flexDirection="column">
                  <Input value={title} errorText={isError.groupName} onChange={setTitle} maxLength={15} setError={setError} title="groupName" />
                </Label>
                <Label title="내 이름" flexDirection="column">
                  <Input value={nickname} errorText={isError.nickname} onChange={setNickname} maxLength={15} setError={setError} title="nickname" />
                </Label>
                <Label title="모임 유형" flexDirection="column">
                  <DropBox dropDownList={DROPDOWN_LIST} type={type} setType={setType} boxWidth="170px" />
                </Label>
                <Label title="커버 색상" flexDirection="column" margin="0px">
                  <GroupColorList selectedColor={coverColor} onChange={setCoverColor} />
                </Label>
              </div>
              <div>
                <Label title="모임 탈퇴" flexDirection="column">
                  <Style.WithDrwal>
                    <Style.GroupName>{groupData?.content.title}</Style.GroupName>
                    <Style.QuitButton onClick={handleGroupWithdrawalModal}>탈퇴</Style.QuitButton>
                  </Style.WithDrwal>
                </Label>
                <Style.Flex>
                  <Style.DeleteButton onClick={handleGroupDeleteModal}>모임 삭제</Style.DeleteButton>
                </Style.Flex>
              </div>
            </Style.Container>
          </Style.Layout>
        </Modal.Body>
        <Modal.Footer>
          <Style.ButtonFrame>
            <Button color="white" onClick={modalHandler}>
              취소
            </Button>
            <Button color={isValidForm() ? 'black' : 'disabled'} onClick={updateGroupInfo} id="group_modify" loading={isLoading}>
              저장
            </Button>
          </Style.ButtonFrame>
        </Modal.Footer>
      </Modal.Frame>
      {showGroupWithdrawalModal && hasMoreUser && (
        <OneButtonModal
          width="448px"
          height="265px"
          modalHandler={handleGroupWithdrawalModal}
          title={GROUP_WITHDRWWAL_ADMIN.HAS_USER.title}
          description={GROUP_WITHDRWWAL_ADMIN.HAS_USER.desc}
          confirm={{ text: '확인', onClick: handleGroupWithdrawalModal }}
        />
      )}
      {showGroupWithdrawalModal && hasNoUser && (
        <ConfirmModal
          width="448px"
          height="265px"
          modalHandler={handleGroupWithdrawalModal}
          title={GROUP_WITHDRWWAL_ADMIN.NO_USER.title}
          description={GROUP_WITHDRWWAL_ADMIN.NO_USER.desc}
          cancel={{ text: '취소', onClick: handleGroupWithdrawalModal }}
          confirm={{ text: '모임 탈퇴', onClick: withdrwalGroup }}
        />
      )}
      {showGroupDeleteModal && hasNoUser && (
        <ConfirmModal
          width="448px"
          height="265px"
          modalHandler={handleGroupDeleteModal}
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
          modalHandler={handleGroupDeleteModal}
          title={GROUP_DELETE.HAS_USER.title}
          description={GROUP_DELETE.HAS_USER.desc}
          confirm={{ text: '확인', onClick: handleGroupDeleteModal }}
        />
      )}
    </>
  );
};
