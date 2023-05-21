import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { Label, DropBox, Button } from '@/components/@common';
import * as Style from './styles';
import { EventInfo, PaymentType } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { getStatusCode, getStatusText } from '@/utils/getStatusIcon';
import { useDeleteDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { FineBookModal } from '@/components/@common/Modal/FineBookModal';
import { TwoButtonModal } from '@/components/@common/Modal/TwoButtonModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { useGroupDetail } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { initialSelectData } from '@/pages/FineBook/DetailFine';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  select: EventInfo;
  setSelect: Dispatch<SetStateAction<EventInfo>>;
};

const UserDetails = ({ open, setOpen, select, setSelect }: Props) => {
  if (!open) return null;
  const { eventId, groundsDate, paymentType, userName, payment, grounds, userId } = select;

  const { groupId } = useParams();

  const { data } = useGroupDetail(Number(groupId));
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
  const [openRequestStatusModal, setOpenRequestStatusModal] = useState(false);
  const [openDeleteDetailModal, setOpenDeleteDetailModal] = useState(false);

  const user = useRecoilValue(userState);
  const isAdmin = data?.content.isAdmin;

  const statusList: { title: PaymentType; id?: string }[] = [{ title: '미납', id: 'nonpayment_side' }, { title: '완납', id: 'fullpayment_side' }, { title: '확인필요' }];
  const [newStatus, setNewStatus] = useState<PaymentType>('');

  const { mutate: update } = useUpdateDetailStatus();
  const { mutate: deleteDetail } = useDeleteDetail();

  const updateStatus = () => {
    if (getStatusCode(newStatus) !== paymentType) {
      update(
        { paymentType: getStatusCode(newStatus), eventId },
        {
          onSuccess() {
            setOpenUpdateStatusModal(false);
            setSelect((prev) => ({ ...prev, paymentType: getStatusCode(newStatus) }));
            if (isAdmin === true && getStatusCode(newStatus) === 'full') {
              pushDataLayer('fullpayment', { route: 'detail' });
            }
          },
        },
      );
    }
  };

  const requestConfirmStatus = () => {
    update(
      { paymentType: 'con', eventId },
      {
        onSuccess(data) {
          setSelect((prev) => ({ ...prev, ...data.content }));
          setOpenRequestStatusModal(false);
          if (isAdmin === false) {
            pushDataLayer('confirming', { route: 'detail' });
          }
        },
      },
    );
  };

  const deleteDetailInfo = () => {
    deleteDetail(eventId, {
      onSuccess() {
        setOpenDeleteDetailModal(false);
        setOpen(false);
      },
    });
  };

  const handleUpdateModal = () => {
    setOpenUpdateModal((prev) => !prev);
  };

  const handleDeleteDetailModal = () => {
    setOpenDeleteDetailModal((prev) => !prev);
  };

  const cancelUpdateStatus = () => {
    setNewStatus('');
    setOpenUpdateStatusModal(false);
  };

  const cancelRequestStatus = () => {
    setOpenRequestStatusModal(false);
  };

  const cancelDeleteDetail = () => {
    setOpenDeleteDetailModal(false);
  };

  const closeUserDetails = () => {
    setOpen(false);
    setSelect(initialSelectData);
  };

  useEffect(() => {
    if (newStatus !== '') {
      setOpenUpdateStatusModal(true);
    }
  }, [newStatus]);

  const dropdownStatusList = () => {
    if (data?.content.isAdmin) {
      return statusList.filter((status) => {
        if (newStatus && status.title !== '확인필요') {
          return status.title !== newStatus;
        } else {
          return status.title !== getStatusText(paymentType);
        }
      });
    }
    if (user.userId === userId) {
      return statusList.filter((status) => paymentType === 'non' && status.title === '확인필요');
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
              <DropBox color="disabled" setType={() => undefined} boxWidth="116px" width={116} type={groundsDate.split(' ')[0]} dropDownList={statusList} />
            </Label>
            <Label title="납부여부" width="80px">
              {data?.content.isAdmin ? (
                <DropBox
                  color={(user.userId === userId && paymentType === 'non' && newStatus !== '확인필요') || data?.content.isAdmin ? 'white' : 'disabled'}
                  boxWidth="112px"
                  width={112}
                  setType={setNewStatus}
                  type={newStatus !== '' ? newStatus : paymentType === 'con' && !data?.content.isAdmin ? '확인중' : getStatusText(paymentType)}
                  dropDownList={dropdownStatusList()}
                />
              ) : (
                <Style.StatusButton status={paymentType}>{paymentType === 'non' ? '미납' : paymentType === 'con' ? '확인 중' : '완납'}</Style.StatusButton>
              )}
            </Label>
          </Style.Row>
          <Label title="사유" width="30px">
            <Style.TextArea disabled placeholder="내용을 입력해주세요." value={grounds}></Style.TextArea>
          </Label>
        </Style.UserDetailsContent>
        {data?.content.isAdmin && (
          <Style.Footer>
            <Button onClick={handleDeleteDetailModal} color="white">
              삭제
            </Button>
            <Button onClick={handleUpdateModal} color="black">
              수정
            </Button>
          </Style.Footer>
        )}
        {!data?.content.isAdmin && user.userId === userId && (
          <Style.Footer>
            <Button width="150px" height="42px" color={paymentType === 'non' ? 'black' : 'disabled'} onClick={() => setOpenRequestStatusModal(true)} id="confirming_side">
              {paymentType === 'non' ? '확인 요청' : paymentType === 'con' ? '요청 완료' : '확인 완료'}
            </Button>
          </Style.Footer>
        )}
      </Style.UserDetailsFrame>
      {openUpdateStatusModal && (
        <TwoButtonModal
          id={getStatusCode(newStatus) === 'full' ? 'fullpayment_side_modal' : ''}
          onClick={cancelUpdateStatus}
          title="납부여부 변경"
          height="215px"
          description="납부여부를 변경하시겠습니까?"
          cancel={{ text: '취소', onClick: cancelUpdateStatus }}
          confirm={{ text: '변경하기', onClick: updateStatus }}
        />
      )}
      {openRequestStatusModal && (
        <TwoButtonModal
          id="confirming_side_modal"
          onClick={cancelRequestStatus}
          title="납부여부 변경"
          height="240px"
          description={`총무에게 확인 요청을 보내시겠습니까? \n 요청 후 변경이 불가능합니다.`}
          cancel={{ text: '취소', onClick: cancelRequestStatus }}
          confirm={{ text: '요청하기', onClick: requestConfirmStatus }}
        />
      )}
      {openDeleteDetailModal && (
        <TwoButtonModal
          onClick={cancelDeleteDetail}
          title="내역 삭제"
          height="240px"
          description={`벌금 내역을 삭제하시겠습니까? \n 삭제된 내역은 복구가 불가능합니다.`}
          cancel={{ text: '취소', onClick: cancelDeleteDetail }}
          confirm={{ text: '삭제하기', onClick: deleteDetailInfo }}
        />
      )}
      {openUpdateModal && <FineBookModal eventId={eventId} select={select} setOpen={setOpenUpdateModal} setSelect={setSelect} />}
    </>
  );
};
export default UserDetails;
