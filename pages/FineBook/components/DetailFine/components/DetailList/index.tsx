import { EventInfo } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FilterMode } from '../..';
import { DropDownWrapper } from '../DropDownWrapper';
import * as Style from './styles';

interface DetailListProps {
  selectedEventId: number;
  details?: EventInfo[];
  mode: FilterMode;
  setSelect: Dispatch<SetStateAction<EventInfo>>;
  setOpenUserDetails: Dispatch<SetStateAction<boolean>>;
}

export const DetailList: FC<DetailListProps> = ({ mode, selectedEventId, details, setSelect, setOpenUserDetails }) => {
  if (details == null) return null;
  if (details.length === 0 && mode === 'day') return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;
  if (details.length === 0) return <Style.NotFoundList>선택하신 조건에 맞는 벌금 내역이 없습니다.</Style.NotFoundList>;

  const [openListEventId, setOpenListEventId] = useState(0);

  const handleUserDetailModal = (detail: EventInfo) => {
    setSelect(detail);
    setOpenUserDetails(true);
  };

  return (
    <Style.DetailList>
      {details.map((detail, i) => {
        const { groundsDate, userName, payment, grounds } = detail;
        return (
          <Style.TableRow key={i} isSelected={selectedEventId === detail.eventId} onClick={() => handleUserDetailModal(detail)}>
            <Style.Element hasEllipsis={false}>{groundsDate.slice(2)}</Style.Element>
            <DropDownWrapper detail={detail} openListEventId={openListEventId} setOpenListEventId={setOpenListEventId} />
            <Style.Element hasEllipsis>{userName}</Style.Element>
            <Style.Element hasEllipsis>{changeNumberToMoney(payment)}</Style.Element>
            <Style.Element hasEllipsis>{grounds}</Style.Element>
          </Style.TableRow>
        );
      })}
    </Style.DetailList>
  );
};
