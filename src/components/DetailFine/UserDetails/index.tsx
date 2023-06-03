import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { Label, DropBox, Button } from '@/components/@common';
import * as Style from './styles';
import { ClientEventInfo, PaymentType, ServerPaymentType } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { getStatusCode, getStatusText, statusText } from '@/utils/status';
import { useDeleteDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { FineBookModal } from '@/components/@common/Modal/FineBookModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { initialSelectData } from '@/pages/FineBook/DetailFine';
import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';

type Props = {
  select: ClientEventInfo;
  setSelect: Dispatch<SetStateAction<ClientEventInfo>>;
};

const REQUEST_BUTTON: { [key in ServerPaymentType]: string } = {
  non: '확인 요청',
  con: '요청 완료',
  full: '확인 완료',
};

const STATUS_LIST: { title: PaymentType; id?: string }[] = [{ title: '미납', id: GA.NON.SIDE_BUTTON }, { title: '완납', id: GA.FULL.SIDE_BUTTON }, { title: '확인필요' }];

const UserDetails = ({ select, setSelect }: Props) => {
  const { eventId, groundsDate, paymentType, userName, payment, grounds, userId } = select;

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { groupId } = useParams();

  const { data: groupDetail } = useGroupDetail(Number(groupId));

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

  const handleUpdateStatusConfirmModal = (newStatus: PaymentType) => {
    if (newStatus !== '') {
      openConfirmModal({
        type: 'CHANGE_STATUS',
        confirm: updateStatus,
        cancel: cancelUpdateStatus,
        id: getStatusCode(newStatus) === 'full' ? GA.FULL.SIDE_MODAL : '',
      });
    }
  };

  const [newStatus, setNewStatus] = useState<PaymentType>('');

  const user = useRecoilValue(userState);

  const isAdmin = groupDetail?.content.isAdmin as boolean;
  const isOwn = user.userId === userId;

  const onSuccessUpdateStatus = (paymentType: ServerPaymentType) => {
    closeConfirmModal();
    setNewStatus('');

    setSelect((prev) => ({ ...prev, paymentType }));
    if (isAdmin === true && paymentType === 'full') return pushDataLayer('fullpayment', { route: 'detail' });
    if (isAdmin === false) pushDataLayer('confirming', { route: 'detail' });
  };

  const closeUserDetails = () => {
    setSelect(initialSelectData);
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { mutate: deleteDetail } = useDeleteDetail(closeUserDetails);

  const updateStatus = () => {
    if (newStatus === '') return;
    if (getStatusCode(newStatus) !== paymentType) {
      mutateDetailStatus({ paymentType: getStatusCode(newStatus), eventId });
    }
  };

  const requestConfirmStatus = () => {
    mutateDetailStatus({ paymentType: 'con', eventId });
  };

  const deleteDetailInfo = async () => {
    deleteDetail(eventId);
  };

  const cancelUpdateStatus = () => {
    setNewStatus('');
    closeConfirmModal();
  };

  useEffect(() => {
    handleUpdateStatusConfirmModal(newStatus);
  }, [newStatus]);

  const dropdownStatusList = () => {
    if (isAdmin) {
      return STATUS_LIST.filter((status) => {
        if (status.title === '확인필요') return false;
        if (paymentType === 'con') return true;

        return status.title !== getStatusText(paymentType);
      });
    }
    if (isOwn) {
      return STATUS_LIST.filter((status) => paymentType === 'non' && status.title === '확인필요');
    }
    return [];
  };

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
            <Style.Text>{userName}</Style.Text>
          </Style.Block>
          <Style.Block>
            <Style.Text>{changeNumberToMoney(payment)}원</Style.Text>
          </Style.Block>
          <Style.Row>
            <Label title="날짜" width="32px">
              <DropBox color="disabled" setType={() => undefined} boxWidth="116px" width={116} type={groundsDate.split(' ')[0]} dropDownList={STATUS_LIST} />
            </Label>
            <Label title="납부여부" width="80px">
              {dropdownStatusList().length ? (
                <DropBox
                  color="white"
                  boxWidth="112px"
                  width={112}
                  setType={setNewStatus}
                  type={newStatus !== '' ? newStatus : getStatusText(paymentType)}
                  dropDownList={dropdownStatusList()}
                />
              ) : (
                <Style.StatusButton status={paymentType}>{statusText(isAdmin, isOwn, paymentType as ServerPaymentType)}</Style.StatusButton>
              )}
            </Label>
          </Style.Row>
          <Label title="사유" width="30px">
            <Style.TextArea disabled placeholder="내용을 입력해주세요." value={grounds}></Style.TextArea>
          </Label>
        </Style.UserDetailsContent>
        {/* 여기부터 */}
        {isAdmin && (
          <Style.Footer>
            <Button onClick={handleDeleteConfirmModal} color="white">
              삭제
            </Button>
            <Button onClick={handleUpdateModal} color="black">
              수정
            </Button>
          </Style.Footer>
        )}
        {!isAdmin && isOwn && (
          <Style.Footer>
            <Button width="150px" height="42px" color={paymentType === 'non' ? 'black' : 'disabled'} onClick={handleRequestConfirmModal} id={GA.CON.SIDE_BUTTON}>
              {REQUEST_BUTTON[paymentType as ServerPaymentType]}
            </Button>
          </Style.Footer>
        )}
        {/* 여기까지 수정 예정 */}
      </Style.UserDetailsFrame>
      {showUpdateModal && <FineBookModal eventId={eventId} select={select} modalHandler={handleUpdateModal} setSelect={setSelect} />}
    </>
  );
};

export default UserDetails;
