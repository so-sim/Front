import { ARROW } from '@/assets/icons/Arrow';
import { Button, Input } from '@/components/@common';
import { PLACEHOLDER } from '@/constants/Group';
import useGroupForm from '@/hooks/Group/useGroupForm';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import MobileLabel from '@/m-components/@common/Label';
import { useGroupDetail } from '@/queries/Group';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Style from './styles';
import { useChangeNickname } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';

const MobileUserGroupSetting = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [nickname, setNickname] = useState('');

  const handleNickname = (nickname: string) => {
    setNickname(nickname);
  };

  const goBack = () => {
    navigate(-1);
  };

  const { isError, setError, getGroupFormAction } = useGroupForm('update');
  const { withdrwalGroup } = getGroupFormAction();

  const { data: myNickname } = useGetMyNikname(Number(groupId));
  const { data: groupData } = useGroupDetail(Number(groupId));
  const { mutate: updateNickname, isLoading } = useChangeNickname({ setError });

  const updateMyNickname = () => {
    const id = Number(groupId);
    !isError.nickname && updateNickname({ groupId: id, nickname });
  };

  useEffect(() => {
    if (!myNickname) return;
    setNickname(myNickname.content.nickname);
  }, [myNickname?.content.nickname]);

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="모임 설정">
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 8px', height: '100%' }}>
        <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MobileLabel title="내 이름">
            <Input //
              placeholder={PLACEHOLDER.NAME}
              value={nickname}
              errorText={isError.nickname}
              onChange={handleNickname}
              maxLength={15}
              setError={setError}
              title="nickname"
            />
          </MobileLabel>
          <MobileLabel title="모임 탈퇴">
            <Style.WithDrwal>
              <Style.GroupTitle>{groupData?.content.title}</Style.GroupTitle>
              <Style.QuitButton onClick={withdrwalGroup}>탈퇴</Style.QuitButton>
            </Style.WithDrwal>
          </MobileLabel>
        </div>
        <div style={{ display: 'flex', gap: '12px', width: '100%', marginBottom: '20px' }}>
          <Button color="white" width="100%" height="42px" onClick={goBack}>
            취소
          </Button>
          <Button color="black" width="100%" height="42px" loading={isLoading} onClick={updateMyNickname}>
            저장
          </Button>
        </div>
      </div>
    </ModalPageLayout>
  );
};

export default MobileUserGroupSetting;
