import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { Button, DropBox, Label } from '@/components/@common';
import { Tooltip } from '@/components/@common/Tooltip';
import PaymentRequest from '@/components/@common/Tooltip/PaymentRequest';
import { REQUEST_BUTTON } from '@/components/DetailFine/UserDetails';
import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import useLockScroll from '@/hooks/useLockScroll';
import useSituationList from '@/hooks/useSituationList';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import SituationBottomSheet from '@/m-components/BottomSheet/SituationBottomSheet';
import { useDeleteDetail, useGetOneOfDetail, useUpdateDetailStatus } from '@/queries/Detail';
import { useGetDetailListById } from '@/queries/Detail/useGetDetailListById';
import { useGroupDetail } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';
import { useRequestNotification } from '@/queries/Notification/useRequestNotifaction';
import { detailFineState } from '@/store/detailFineState';
import { Situation } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { covertDateForView } from '@/utils/convertFormat';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import * as Style from './styles';

// const REQUEST_BUTTON: { [key in Situation]: string } = {
//   미납: '납부요청',
//   확인중: '승인대기',
//   완납: '납부완료',
// };

const DROPDOWN_BUTTON: { [key in Situation]: string } = {
  미납: '납부 전',
  확인중: '승인 대기',
  완납: '납부 완료',
};

const MobileFineBookDetail = () => {
  const { groupId, fineBookDetailId } = useParams();

  const navigate = useNavigate();

  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;
  const { data: myNickname } = useGetMyNikname(Number(groupId));

  const { data, isLoading } = useGetOneOfDetail(Number(fineBookDetailId));

  const [isOpen, setIsOpen] = useRecoilState(detailFineState);

  const { eventId, date, situation, nickname, amount, memo, ground } = data?.content || {
    eventId: 1,
    date: 'loading',
    situation: '미납',
    nickname: 'loading',
    amount: 123,
    memo: 'loading',
    ground: '결석',
  };
  // 컴포넌트 한겹 더 만들기

  const { dropdownList, convertTextToSituation, convertSituationToText } = useSituationList(situation);

  const isOwn = nickname === myNickname?.content.nickname;

  const goBack = () => {
    setIsOpen(true);
    navigate(-1);
  };

  const goToCalendar = () => {
    navigate(`/m-group/${groupId}/book`);
  };

  const goToUpdateFineBook = () => {
    navigate(`/m-group/${groupId}/update-finebook?eventId=${eventId}`);
  };

  const { mutate: deleteDetail } = useDeleteDetail(goToCalendar);

  const { withdrawalParticipants } = useWithdrawalParticipantList(Number(groupId));

  const isWithdrawalMember = (nickname: string) => {
    return withdrawalParticipants?.includes(nickname);
  };

  const handleDeleteConfirmModal = () => {
    openConfirmModal({
      type: 'DETAIL_DELETE',
      confirm: () => deleteDetail(eventId),
      cancel: closeConfirmModal,
    });
  };

  // 바텀시트
  const [openSituationSheet, setOpenSituationSheet] = useState(false);
  useLockScroll(openSituationSheet, 'openSituationSheet');

  const handleOpenSituationSheet = () => {
    setOpenSituationSheet((prev) => !prev);
  };

  const changeConfirmStatus = (situation: Situation) => {
    mutateDetailStatus({ situation, eventIdList: [eventId] });
  };

  const updateConfirmStatus = (situation: Situation) => {
    openConfirmModal({
      type: 'CHANGE_STATUS_ADMIN',
      confirm: () => changeConfirmStatus(situation),
      cancel: closeConfirmModal,
      id: GA.CON.SIDE_MODAL,
    });
  };

  // 밑에 모달 작업 및 납부완료(유저) 보내기 mutate (공유 hook예정) // 알람 요청하기 API 랑 같이

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const handleRequestConfirmModal = () => {
    openConfirmModal({
      type: 'REQUEST_CHANGE_STATUS',
      confirm: requestConfirmStatus,
      cancel: closeConfirmModal,
      id: GA.CON.SIDE_MODAL,
    });
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

  const onSuccessUpdateStatus = (situation: Situation) => {
    closeConfirmModal();

    if (situation === '미납') pushDataLayer('nonpayment', { route: 'detail' });
    if (isAdmin === true && situation === '완납') return pushDataLayer('fullpayment', { route: 'detail' });
    if (isAdmin === false) pushDataLayer('confirming', { route: 'detail' });
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);

  const requestConfirmStatus = () => {
    mutateDetailStatus({ situation: '확인중', eventIdList: [eventId] });
  };

  if (isLoading) return null;

  return (
    <>
      <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="상세내역">
        <div style={{ padding: '1.5rem 1rem' }}>
          <Style.BetweenBlock>
            <Style.Date>{covertDateForView(date.slice(2))}</Style.Date>
            {isAdmin ? (
              <Style.ButtonBox>
                <Style.AdminButton onClick={handleDeleteConfirmModal}>삭제</Style.AdminButton>
                <Style.AdminButton onClick={goToUpdateFineBook}>수정</Style.AdminButton>
              </Style.ButtonBox>
            ) : (
              <div />
            )}
          </Style.BetweenBlock>
          <Style.SemiBlock>
            <Style.PersonIcon>{USER.PERSON_24}</Style.PersonIcon>
            <Style.Text>{nickname}</Style.Text>
          </Style.SemiBlock>
          <Style.Block>
            <Style.GroundText>{changeNumberToMoney(amount)}원</Style.GroundText>
          </Style.Block>
          <Style.Row>
            <Style.TitleWrapper>
              <Style.DetailFineTitle>사유</Style.DetailFineTitle>
              <Style.GroundBox>{ground}</Style.GroundBox>
            </Style.TitleWrapper>
            <Style.TitleWrapper>
              <Style.DetailFineTitle>납부여부</Style.DetailFineTitle>
              {isAdmin ? (
                <Style.DropdownButton onClick={handleOpenSituationSheet}>
                  {DROPDOWN_BUTTON[situation]}
                  <Style.ArrowIcon>{ARROW.DOWN_LG_NON_FOCUS}</Style.ArrowIcon>
                </Style.DropdownButton>
              ) : (
                <Style.StatusButton situation={situation}>{convertSituationToText(situation)}</Style.StatusButton>
              )}
            </Style.TitleWrapper>
          </Style.Row>

          <Style.MemoWrapper>
            <Style.DetailFineMemoTitle>메모</Style.DetailFineMemoTitle>

            <Style.TextArea disabled placeholder="(선택) 내용을 입력해주세요." value={memo} />
          </Style.MemoWrapper>
        </div>
        <Style.Footer>
          {isAdmin &&
            !isWithdrawalMember(nickname) && // 탈퇴한지 판별
            !isOwn &&
            situation === '미납' && (
              <Tooltip
                title="납부 요청이란?"
                contents={PaymentRequest}
                width={312}
                location="TOP"
                top="-200px"
                left={`calc(${window.innerWidth / 2}px - 156px - 24px)`}
                messageBox={{ left: '148px', top: '160px', width: '100%' }}
                defaultValue
                preventClick
                trigger={
                  <Button width="100%" height="42px" color="black" onClick={handleRequestPayment} id={GA.CON.SIDE_BUTTON}>
                    납부요청
                  </Button>
                }
              />
            )}

          {!isAdmin && isOwn && situation !== '완납' && (
            <Button
              width="100%"
              height="42px"
              color={situation === '미납' ? 'black' : 'disabled'} //
              onClick={handleRequestConfirmModal}
              id={GA.CON.SIDE_BUTTON}
            >
              {REQUEST_BUTTON[situation]}
            </Button>
          )}
          {/* {!isAdmin && isOwn && situation !== '완납' && (
            <Button
              width="100%"
              height="42px"
              color={situation === '미납' ? 'black' : 'disabled'} //
              onClick={handleRequestConfirmModal}
              id={GA.CON.SIDE_BUTTON}
            >
              {REQUEST_BUTTON[situation]}
            </Button>
          )} */}
        </Style.Footer>
        {openSituationSheet && <SituationBottomSheet onClose={handleOpenSituationSheet} onChange={changeConfirmStatus} onConfirm={updateConfirmStatus} />}
      </ModalPageLayout>
    </>
  );
};

export default MobileFineBookDetail;
