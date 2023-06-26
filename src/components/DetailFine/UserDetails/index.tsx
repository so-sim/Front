import { Dispatch, SetStateAction, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { Label, DropBox, Button } from '@/components/@common';
import * as Style from './styles';
import { Situation, SelectedEventInfo } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { useDeleteDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { initialSelectData } from '@/pages/FineBook/DetailFine';

import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import { getAdminDropdownStatusList, getOwnDropdownStatusList } from '@/utils/statusList';
import FineBookUpdateModal from '@/components/@common/Modal/FineBookModal/FineBookUpdateModal';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { useSelectedContext } from '@/contexts/SelectedFineContext';

const REQUEST_BUTTON: { [key in Situation]: string } = {
  미납: '확인 요청',
  확인중: '요청 완료',
  완납: '확인 완료',
};

const UserDetails = () => {
  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

  const { eventId, date, situation, nickname, amount, memo, ground } = selectedFine;

  const hasSelectedInfo: boolean = eventId !== 0;

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { groupId } = useParams();

  const { data: groupDetail } = useGroupDetail(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const handleDeleteConfirmModal = () => {
    openConfirmModal({
      type: 'DETAIL_DELETE',
      confirm: deleteDetailInfo,
      cancel: closeConfirmModal,
    });
  };

  const handleRequestConfirmModal = () => {
    openConfirmModal({
      type: 'REQUEST_CHANGE_STATUS',
      confirm: requestConfirmStatus,
      cancel: closeConfirmModal,
      id: GA.CON.SIDE_MODAL,
    });
  };

  const handleUpdateStatusConfirmModal = (situation: Situation) => {
    openConfirmModal({
      type: 'CHANGE_STATUS',
      confirm: () => updateStatus(situation),
      cancel: closeConfirmModal,
      id: situation === '완납' ? GA.FULL.SIDE_MODAL : '',
    });
  };

  const isAdmin = groupDetail?.content.isAdmin as boolean;
  const isOwn = nickname === myNickname?.content.nickname;

  const onSuccessUpdateStatus = (situation: Situation) => {
    closeConfirmModal();
    setSelectedFine((prev) => ({ ...prev, situation }));
    if (isAdmin === true && situation === '완납') return pushDataLayer('fullpayment', { route: 'detail' });
    if (isAdmin === false) pushDataLayer('confirming', { route: 'detail' });
  };

  const closeUserDetails = () => {
    setSelectedFine(initialSelectData);
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { mutate: deleteDetail } = useDeleteDetail(closeUserDetails);

  const updateStatus = (situation: Situation) => {
    mutateDetailStatus({ situation, eventIdList: [eventId] });
  };

  const requestConfirmStatus = () => {
    mutateDetailStatus({ situation: '확인중', eventIdList: [eventId] });
  };

  const deleteDetailInfo = () => {
    deleteDetail(eventId);
  };

  const getDropdownStatusList = () => {
    if (isAdmin) return getAdminDropdownStatusList(situation);
    if (isOwn) return getOwnDropdownStatusList(situation);
    return [];
  };

  const dropdownStatusList = getDropdownStatusList();

  if (!hasSelectedInfo) return null;
  return (
    <>
      <Style.UserDetailsFrame>
        <Style.Header>
          <Style.CloseIcon onClick={closeUserDetails}>{SYSTEM.CLOSE}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Header>
        <Style.UserDetailsContent>
          <Style.Block>
            <Style.PersonIcon>{USER.PERSON_XL}</Style.PersonIcon>
            <Style.Text>{nickname}</Style.Text>
          </Style.Block>
          <Style.Block>
            <Style.Text>{changeNumberToMoney(amount)}원</Style.Text>
          </Style.Block>
          <Style.Row>
            <Label title="날짜" width="32px">
              <DropBox color="disabled" setType={() => undefined} boxWidth="116px" width={116} type={date.split(' ')[0]} dropDownList={[]} />
            </Label>
            <Label title="납부여부" width="80px">
              {dropdownStatusList.length ? (
                <DropBox color="white" boxWidth="112px" width={112} setType={handleUpdateStatusConfirmModal} type={situation} dropDownList={dropdownStatusList} />
              ) : (
                <Style.StatusButton situation={situation}>{situation}</Style.StatusButton>
              )}
            </Label>
          </Style.Row>
          <Label title="사유" width="30px">
            <Style.TextArea disabled placeholder="내용을 입력해주세요." value={memo} />
          </Label>
        </Style.UserDetailsContent>
        <Style.Footer>
          {isAdmin && (
            <>
              <Button onClick={handleDeleteConfirmModal} color="white">
                삭제
              </Button>
              <Button onClick={handleUpdateModal} color="black">
                수정
              </Button>
            </>
          )}
          {!isAdmin && isOwn && (
            <Button width="150px" height="42px" color={situation === '미납' ? 'black' : 'disabled'} onClick={handleRequestConfirmModal} id={GA.CON.SIDE_BUTTON}>
              {REQUEST_BUTTON[situation]}
            </Button>
          )}
        </Style.Footer>
      </Style.UserDetailsFrame>
      {showUpdateModal && <FineBookUpdateModal select={selectedFine} modalHandler={handleUpdateModal} setSelect={setSelectedFine} />}
    </>
  );
};

export default UserDetails;
