import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Style from './styles';
import { DropDownWrapper } from '@/components/DetailFine';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import { dateState } from '@/store/dateState';
import { SelectedEventInfo } from '@/types/event';
import { useSelectedContext } from '@/contexts/SelectedFineContext';

type Props = {
  details?: SelectedEventInfo[];
  detailFilter: DetailFilter;
};

const DetailList = ({ detailFilter, details }: Props) => {
  const [calendarState, setCalendarState] = useRecoilState(dateState);

  const [openButtonListId, setOpenButtonListId] = useState(0);

  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

  const handleUserDetailModal = (detail: SelectedEventInfo) => {
    setSelectedFine(detail);
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
            <Style.Element hasEllipsis={false}>{date.slice(2)}</Style.Element>
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
