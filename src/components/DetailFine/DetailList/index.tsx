import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import React, { useEffect, useState } from 'react';
import * as Style from './styles';
import { DropDownWrapper } from '@/components/DetailFine';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import { dateState } from '@/store/dateState';
import { SelectedEventInfo } from '@/types/event';
import { useSelectedContext, initialSelectData } from '@/contexts/SelectedFineContext';
import CheckboxContainer from '../../@common/Checkbox';
import { CheckDetailFine, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import DetailListCheckBox from '../checkbox';
import useCheckListState from '@/hooks/useCheckListState';
import { covertDateForView } from '@/utils/convertFormat';
import { notificationModalState } from '@/store/notificationModalState';

type Props = {
  details?: SelectedEventInfo[];
  detailFilter: DetailFilter;
};

const DetailList = ({ detailFilter, details }: Props) => {
  const [calendarState, setCalendarState] = useRecoilState(dateState);

  const [showNotification, setShowNotification] = useRecoilState(notificationModalState);

  const [openButtonListId, setOpenButtonListId] = useState(0);

  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

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

  useEffect(() => {
    setSelectedFine(initialSelectData);
  }, [showNotification]);

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
    setInitCheckDetailFine();
  }, [openButtonListId, selectedFine]);

  const filteredDataNotFound = details?.length === 0 && calendarState.mode === 'day' && detailFilter.nickname === '' && detailFilter.situation === '';

  // hooks rules 참고 (무조건 조건 렌더링은 hooks 다음)!

  if (filteredDataNotFound) return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;
  if (details?.length === 0) return <Style.NotFoundList>선택하신 조건에 맞는 벌금 내역이 없습니다.</Style.NotFoundList>;

  return (
    <Style.DetailList>
      {details?.map((detail, i) => {
        const { date, nickname, amount, memo, eventId, ground } = detail;
        return (
          <Style.TableRow key={i} isSelected={selectedFine.eventId === eventId} onClick={() => handleUserDetailModal(detail)}>
            <Style.CheckboxWrapper
              onClick={(e) => {
                e.stopPropagation();
                setToggleCheckList(detail);
              }}
            >
              <CheckboxContainer id={String(eventId)} isChecked={isChecked(eventId)} onChange={(event: React.MouseEvent<HTMLInputElement>) => setToggleCheckList(detail)}>
                <CheckboxContainer.Checkbox as={DetailListCheckBox} />
                {/*    이 부분 props를 자연스럽게 넘겨주려면 이 방법 밖에?? function으로 넘겨주는 방법도 있긴한데,  이거는 rest props 안넘어옴 */}
              </CheckboxContainer>
            </Style.CheckboxWrapper>
            <Style.Element hasEllipsis={false}>{covertDateForView(date.slice(2))}</Style.Element>
            <DropDownWrapper openButtonListId={openButtonListId} detail={detail} setOpenButtonListId={setOpenButtonListId} />
            <Style.Element hasEllipsis>{nickname}</Style.Element>
            <Style.Element hasEllipsis>{changeNumberToMoney(amount)}</Style.Element>
            <Style.Element hasEllipsis>
              <Style.GroundText>
                {ground}
                {memo && <span>&#12539;</span>}
              </Style.GroundText>
              {/* Katakana middle dot 이라고 합니다..(저도 잘 몰라요 하하) */}
              {memo}
            </Style.Element>
          </Style.TableRow>
        );
      })}
    </Style.DetailList>
  );
};

export default DetailList;
