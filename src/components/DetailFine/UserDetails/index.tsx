import { Dispatch, SetStateAction, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { Label, DropBox, Button } from '@/components/@common';
import * as Style from './styles';
import { Situation, SelectedEventInfo } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { useDeleteDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { useParams } from 'react-router-dom';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { initialSelectData } from '@/pages/FineBook/DetailFine';

import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import FineBookUpdateModal from '@/components/@common/Modal/FineBookModal/FineBookUpdateModal';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { useSelectedContext } from '@/contexts/SelectedFineContext';
import useSituationList, { SituationText } from '@/hooks/useSituationList';
import { useGroupDetail } from '@/queries/Group';
import { Tooltip } from '@/components/@common/Tooltip';
import PaymentRequest from '@/components/@common/Tooltip/PaymentRequest';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';
import { useRequestNotification } from '@/queries/Notification/useRequestNotifaction';
import WithdrawBadge from '@/components/@common/WithdrawBadge';
import { requestNotificationState } from '@/store/requestNotificationState';
import { useRecoilState } from 'recoil';
import { covertDateForView } from '@/utils/convertFormat';

type Props = {
  select: SelectedEventInfo;
  setSelect: Dispatch<SetStateAction<SelectedEventInfo>>;
};

export const REQUEST_BUTTON: { [key in Situation]: string } = {
  미납: '납부완료',
  확인중: '승인대기',
  완납: '',
};

const DROP_BUTTON = {
  미납: GA.NON.DETAIL_DROP,
  완납: GA.FULL.DETAIL_DROP,
  확인중: GA.CON.DETAIL_DROP,
};

const UserDetails = () => {
  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

  const { eventId, date, situation, nickname, amount, memo, ground } = selectedFine;

  const hasSelectedInfo: boolean = eventId !== 0;

  const { groupId } = useParams();
  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;
  const { withdrawalParticipants } = useWithdrawalParticipantList(Number(groupId));

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const isWithdrawalMember = (nickname: string) => {
    return withdrawalParticipants?.includes(nickname);
  };

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

  const handleRequestConfirmModal = async () => {
    const isValid = true;

    if (isValid) {
      openConfirmModal({
        type: 'REQUEST_CHANGE_STATUS',
        confirm: requestConfirmStatus,
        cancel: closeConfirmModal,
        id: GA.CON.SIDE_MODAL,
      });
    } else {
      openConfirmModal({
        type: 'NOTICE_CANNOT_REQUEST',
        confirm: closeConfirmModal,
      });
    }
  };
  const { mutate: mutateRequestNotification } = useRequestNotification();

  // 벌금 납부 요청
  const handleRequestPayment = () => {
    openConfirmModal({
      type: 'REQUEST_PAYMENT',
      confirm: () => mutateRequestNotification([eventId]),
      cancel: closeConfirmModal,
    });
  };

  const handleUpdateStatusConfirmModal = (situation: SituationText) => {
    const convertedSituation = convertTextToSituation(situation);
    if (isAdmin && isOwn) {
      openConfirmModal({
        type: 'CHANGE_OWN_ADMIN_STATUS',
        confirm: () => updateStatus(convertedSituation),
        cancel: closeConfirmModal,
      });
      return;
    }

    openConfirmModal({
      type: 'CHANGE_STATUS_ADMIN',
      confirm: () => updateStatus(convertedSituation),
      cancel: closeConfirmModal,
      // id: situation === '완납' ? GA.FULL.SIDE_MODAL : '',
    });
  };

  const onSuccessUpdateStatus = (situation: Situation) => {
    closeConfirmModal();
    setSelectedFine((prev) => ({ ...prev, situation }));
    if (situation === '미납') pushDataLayer('nonpayment', { route: 'detail' });
    if (isAdmin === true && situation === '완납') return pushDataLayer('fullpayment', { route: 'detail' });
    if (isAdmin === false) pushDataLayer('confirming', { route: 'detail' });
  };

  const closeUserDetails = () => {
    setSelectedFine(initialSelectData);
  };

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { data: myNickname } = useGetMyNikname(Number(groupId));
  const { dropdownList, convertTextToSituation, convertSituationToText } = useSituationList(situation);
  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { mutate: deleteDetail } = useDeleteDetail(closeUserDetails);
  const { isWithdrawal } = useWithdrawalParticipantList(Number(groupId));

  //Todo: 백엔드 api 업데이트되면 수정 예정
  //쿨타임 24시간 대신에 사용 중
  const [sendedNotification, setSendedNotification] = useRecoilState(requestNotificationState);
  const isEnable = !sendedNotification.includes(eventId);

  const updateStatus = (situation: Situation) => {
    mutateDetailStatus({ situation, eventIdList: [eventId] });
  };

  const requestConfirmStatus = () => {
    mutateDetailStatus({ situation: '확인중', eventIdList: [eventId] });
  };

  const deleteDetailInfo = () => {
    deleteDetail(eventId);
  };

  const isOwn = nickname === myNickname?.content.nickname;
  const filteredSituationList = dropdownList //
    .filter((title) => convertTextToSituation(title) !== situation)
    .map((title) => ({ title }));

  if (!hasSelectedInfo) return null;
  return (
    <>
      <Style.UserDetailsFrame>
        <Style.Header>
          <Style.CloseIcon onClick={closeUserDetails}>{SYSTEM.CLOSE_LG}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Header>
        <Style.UserDetailsContent>
          <Style.BetweenBlock>
            <Style.Date>{covertDateForView(date.slice(2))}</Style.Date>
            {isAdmin ? (
              <Style.ButtonBox>
                <Style.AdminButton onClick={handleDeleteConfirmModal}>삭제</Style.AdminButton>
                <Style.AdminButton onClick={handleUpdateModal}>수정</Style.AdminButton>
              </Style.ButtonBox>
            ) : (
              <div />
            )}
          </Style.BetweenBlock>
          <Style.Block>
            <Style.PersonIcon>{USER.PERSON_XL}</Style.PersonIcon>
            <Style.Text>
              {nickname}
              {isWithdrawal(nickname) && <WithdrawBadge size="md" />}
            </Style.Text>
          </Style.Block>
          <Style.Block>
            <Style.Text>{changeNumberToMoney(amount)}원</Style.Text>
          </Style.Block>
          <Style.Row>
            <Label title="사유" width="32px">
              <Style.GroundBox>{ground}</Style.GroundBox>
            </Label>
            <Label title="납부여부" width="80px">
              {isAdmin ? (
                <DropBox
                  color="white"
                  boxWidth="112px"
                  id={DROP_BUTTON[situation]}
                  width={112}
                  setType={handleUpdateStatusConfirmModal}
                  type={convertSituationToText(situation)} //Todo: GA 코드 추가해야됨
                  dropDownList={filteredSituationList}
                />
              ) : (
                <Style.StatusButton situation={situation}>{convertSituationToText(situation)}</Style.StatusButton>
              )}
            </Label>
          </Style.Row>
          <Label title="메모" width="30px">
            <Style.TextArea disabled placeholder="(선택) 내용을 입력해주세요." value={memo} />
          </Label>
        </Style.UserDetailsContent>
        <Style.Footer>
          {!isAdmin && isOwn && situation !== '완납' && (
            <Button
              width="150px"
              height="42px"
              color={situation === '미납' ? 'black' : 'disabled'} //
              onClick={handleRequestConfirmModal}
              id={GA.CON.SIDE_BUTTON}
            >
              {REQUEST_BUTTON[situation]}
            </Button>
          )}
          {isAdmin && //
            !isOwn &&
            !isWithdrawalMember(nickname) &&
            situation === '미납' && (
              <Tooltip
                title="납부 요청이란?"
                contents={PaymentRequest}
                width={312}
                location="BOTTOM"
                top="60px"
                left="-163px"
                messageBox={{ left: '290px', top: '-8px' }}
                onCloseTooltip={() => localStorage.setItem('isFirstRequestPaymentTooltip', 'true')}
                defaultValue={localStorage.getItem('isFirstRequestPaymentTooltip') === null}
                trigger={
                  <Button
                    width="150px"
                    height="42px"
                    color={isEnable ? 'black' : 'disabled'} //
                    onClick={handleRequestPayment}
                    id={GA.PAYMENT_REQUEST.DETAIL_BUTTON}
                  >
                    납부요청
                  </Button>
                }
              />
            )}
        </Style.Footer>
      </Style.UserDetailsFrame>
      {showUpdateModal && <FineBookUpdateModal modalHandler={handleUpdateModal} />}
    </>
  );
};

export default UserDetails;
