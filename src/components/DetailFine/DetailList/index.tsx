import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import React, { useEffect, useState } from 'react';
import * as Style from './styles';
import { DropDownWrapper } from '@/components/DetailFine';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import { dateState } from '@/store/dateState';
import { SelectedEventInfo } from '@/types/event';
import { initialSelectData, useSelectedContext } from '@/contexts/SelectedFineContext';
import CheckboxContainer from '../../@common/Checkbox';
import { CheckDetailFine, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import DetailListCheckBox from '../checkbox';
import useCheckListState from '@/hooks/useCheckListState';
import { covertDateForView } from '@/utils/convertFormat';
import { notificationModalState } from '@/store/notificationModalState';
import { ALARM } from '@/assets/icons/Alarm';
import { SYSTEM } from '@/assets/icons/System';
import { useRequestNotification } from '@/queries/Notification/useRequestNotifaction';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';
import { useParams } from 'react-router-dom';
import WithdrawBadge from '@/components/@common/WithdrawBadge';
import { useGroupDetail } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { requestNotificationState } from '@/store/requestNotificationState';
import { GA } from '@/constants/GA';
import { sideModalState } from '@/store/sideModalState';
import { pushDataLayer } from '@/utils/pushDataLayer';

type Props = {
  details?: SelectedEventInfo[];
  detailFilter: DetailFilter;
};

const DetailList = ({ detailFilter, details }: Props) => {
  const { groupId } = useParams();
  const [calendarState, setCalendarState] = useRecoilState(dateState);

  const [openButtonListId, setOpenButtonListId] = useState(0);

  //Todo: 백엔드 api 업데이트되면 수정 예정
  //쿨타임 24시간 대신에 사용 중
  const [sendedNotification, setSendedNotification] = useRecoilState(requestNotificationState);
  const [sideModal, setSideModal] = useRecoilState(sideModalState);

  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');
  const { mutate: mutateRequestNotification } = useRequestNotification();
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { withdrawalParticipants, isWithdrawal } = useWithdrawalParticipantList(Number(groupId));
  const { data } = useGetMyNikname(Number(groupId));

  const { data: groupDetail } = useGroupDetail(Number(groupId));

  const isAdmin = groupDetail?.content.isAdmin || false;
  const isOwn = (nickname: string) => {
    return data?.content.nickname === nickname;
  };

  const [showNotification, setShowNotification] = useRecoilState(notificationModalState);

  const {
    setCheckDetailFine: { setToggleCheckList, setInitCheckDetailFine },
    isChecked,
  } = useCheckListState();

  //  여기 왜 checkState 타입이 안먹냐

  // 이거 그냥 details에 check 프로퍼티를 추가하는 방법이 더 좋겠는걸?
  // 이부분 하면서 서버상태를 분리하는게 맞나 생각이 들었음

  const handleUserDetailModal = (detail: SelectedEventInfo) => {
    setSelectedFine(detail);
  };

  const requestNotification = (eventId: number) => {
    openConfirmModal({
      type: 'REQUEST_PAYMENT',
      confirm: () => mutateRequestNotification([eventId]),
      cancel: closeConfirmModal,
    });
  };

  const handleToggleCheckbox = (event: React.MouseEvent<HTMLInputElement>, detail: SelectedEventInfo) => {
    event.stopPropagation();
    setToggleCheckList(detail);
  };

  useEffect(() => {
    const closeCircleButtonList = () => {
      setOpenButtonListId(0);
    };

    window.addEventListener('click', closeCircleButtonList);
    return () => {
      window.removeEventListener('click', closeCircleButtonList);
    };
  }, []);

  useEffect(() => {
    if (sideModal.isModal !== true) {
      setInitCheckDetailFine();
    }
  }, [openButtonListId, selectedFine]);

  useEffect(() => {
    setSelectedFine(initialSelectData);
  }, [showNotification]);

  const filteredDataNotFound = details?.length === 0 && calendarState.mode === 'day' && detailFilter.nickname === '' && detailFilter.situation === '';

  // hooks rules 참고 (무조건 조건 렌더링은 hooks 다음)!

  if (filteredDataNotFound) return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;
  if (details?.length === 0) return <Style.NotFoundList>선택하신 조건에 맞는 벌금 내역이 없습니다.</Style.NotFoundList>;

  return (
    <Style.DetailList>
      {details?.map((detail, i) => {
        const { date, nickname, amount, memo, eventId, ground } = detail;
        const isEnable = !sendedNotification.includes(eventId);

        return (
          <Style.TableRow id={GA.LIST.DETAIL} isAdmin={isAdmin} key={i} isSelected={selectedFine.eventId === eventId} onClick={() => handleUserDetailModal(detail)}>
            <CheckboxContainer id={String(eventId)} isChecked={isChecked(eventId)} onChange={(event: React.MouseEvent<HTMLInputElement>) => handleToggleCheckbox(event, detail)}>
              <CheckboxContainer.Checkbox as={DetailListCheckBox} />
              {/*    이 부분 props를 자연스럽게 넘겨주려면 이 방법 밖에?? function으로 넘겨주는 방법도 있긴한데,  이거는 rest props 안넘어옴 */}
            </CheckboxContainer>
            <Style.Element hasEllipsis={false}>{covertDateForView(date.slice(2))}</Style.Element>
            <DropDownWrapper openButtonListId={openButtonListId} detail={detail} setOpenButtonListId={setOpenButtonListId} />
            <Style.FlexElement hasEllipsis>
              {/* {
                isIncludeWithdrawalMember(nickname) && <div>탈퇴</div>
              }
              <> */}
              <Style.Element hasEllipsis>{nickname}</Style.Element>
              {isWithdrawal(nickname) && <WithdrawBadge />}
              {/* </> */}
            </Style.FlexElement>
            <Style.Element hasEllipsis>{changeNumberToMoney(amount)}</Style.Element>
            <Style.Element hasEllipsis>
              <Style.GroundText>
                {ground}
                {memo && <span>&#12539;</span>}
              </Style.GroundText>
              {/* Katakana middle dot 이라고 합니다..(저도 잘 몰라요 하하) */}
              {memo}
            </Style.Element>
            {isAdmin && //
              !isOwn(nickname) &&
              !isWithdrawal(nickname) &&
              detail.situation === '미납' && (
                <Style.Element>
                  <Style.NotificationButton
                    isActive={isEnable}
                    disabled={!isEnable}
                    id={GA.PAYMENT_REQUEST.LIST_BUTTON}
                    onClick={(e) => {
                      e.stopPropagation();
                      requestNotification(eventId);
                      pushDataLayer('gtm.click', { 'gtm.element': GA.PAYMENT_REQUEST.LIST_BUTTON });
                    }}
                  >
                    <div style={{ height: '16px' }}>{isEnable ? ALARM.ALARM_SM : SYSTEM.DONE_SM}</div>
                    <div>{isEnable ? '납부요청' : '요청완료'}</div>
                  </Style.NotificationButton>
                </Style.Element>
              )}
          </Style.TableRow>
        );
      })}
    </Style.DetailList>
  );
};

export default DetailList;
