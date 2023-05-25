import { DateFilterProperty } from '@/utils/dateFilter/dateFilter';
import { ClientEventInfo, EventInfo } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Style from './styles';
import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DropDownWrapper } from '@/components/DetailFine';

type Props = {
  selectedEventId: number;
  details?: EventInfo[];
  mode: FilterMode;
  dateFilterProperty: DateFilterProperty;
  setSelect: Dispatch<SetStateAction<ClientEventInfo>>;
  setOpenUserDetails: Dispatch<SetStateAction<boolean>>;
};

const DetailList = ({ dateFilterProperty, mode, selectedEventId, details, setSelect, setOpenUserDetails }: Props) => {
  if (details == null) return null;
  if (details.length === 0 && mode === 'day' && dateFilterProperty.nickname === '' && dateFilterProperty.paymentType === '')
    return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;
  if (details.length === 0) return <Style.NotFoundList>선택하신 조건에 맞는 벌금 내역이 없습니다.</Style.NotFoundList>;

  const [openButtonListId, setOpenButtonListId] = useState(0);

  const handleUserDetailModal = (detail: EventInfo) => {
    setSelect(detail);
    setOpenUserDetails(true);
  };

  const closeCircleButtonList = () => {
    setOpenButtonListId(0);
  };

  useEffect(() => {
    window.addEventListener('click', closeCircleButtonList);
    return () => {
      window.removeEventListener('click', closeCircleButtonList);
    };
  }, []);

  return (
    <Style.DetailList>
      {details.map((detail, i) => {
        const { groundsDate, userName, payment, grounds, eventId } = detail;
        return (
          <Style.TableRow key={i} isSelected={selectedEventId === eventId} onClick={() => handleUserDetailModal(detail)}>
            <Style.Element hasEllipsis={false}>{groundsDate.slice(2)}</Style.Element>
            <DropDownWrapper openButtonListId={openButtonListId} detail={detail} setOpenButtonListId={setOpenButtonListId} />
            <Style.Element hasEllipsis>{userName}</Style.Element>
            <Style.Element hasEllipsis>{changeNumberToMoney(payment)}</Style.Element>
            <Style.Element hasEllipsis>{grounds}</Style.Element>
          </Style.TableRow>
        );
      })}
    </Style.DetailList>
  );
};

export default DetailList;
