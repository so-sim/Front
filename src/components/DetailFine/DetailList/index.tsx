import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Style from './styles';
import { DropDownWrapper } from '@/components/DetailFine';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import { dateState } from '@/store/dateState';
import { SelectedEventInfo } from '@/types/event';
import { useSelectedContext } from '@/contexts/SelectedFineContext';
import { CheckBoxContainer } from '@/components/@common/Modal/FineBookModal/FormFileds/CircleCheckBox/styles';
import CheckboxContainer from '../UserDetails/checkBox';
import { useSearchParams } from 'react-router-dom';

type Props = {
  details?: SelectedEventInfo[];
  detailFilter: DetailFilter;
};

type CheckState = {
  eventId: Pick<SelectedEventInfo, 'eventId'>;
  checked: boolean;
};

type CheckList = SelectedEventInfo & { checked: boolean };

const DetailList = ({ detailFilter, details }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [calendarState, setCalendarState] = useRecoilState(dateState);

  const [openButtonListId, setOpenButtonListId] = useState(0);

  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

  const [eventIdList, setEventIdList] = useState<number[]>([]);

  //  여기 왜 checkState 타입이 안먹냐
  const [checkedList, setCheckedList] = useState<CheckList[]>();

  // 이거 그냥 details에 check 프로퍼티를 추가하는 방법이 더 좋겠는걸?
  // 이부분 하면서 서버상태를 분리하는게 맞나 생각이 들었음

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

  useEffect(() => {
    setCheckedList(details?.map((list) => ({ ...list, checked: false })));
  }, [details]);

  useEffect(() => {
    console.log(searchParams.get('checked'));
    if (searchParams.get('checked') === 'All') {
      setEventIdList(details?.map((list) => list.eventId) || []);
      return;
    }
    setEventIdList([]);
  }, [searchParams]);

  const filteredDataNotFound = details?.length === 0 && calendarState.mode === 'day' && detailFilter.nickname === '' && detailFilter.situation === '';

  function checkEventList(eventId: number) {
    if (eventIdList.includes(eventId)) {
      setEventIdList((prev) => [...prev.filter((id) => id !== eventId)]);

      console.log(eventIdList.length, details?.length);
      // if (eventIdList.length !== details?.length) {
      //   searchParams.set('checked', 'None');
      //   setSearchParams(searchParams);
      // }
      return;
    }

    setEventIdList((prev) => [...prev, eventId]);
  }

  // hooks rules 참고 (무조건 조건 렌더링은 hooks 다음)!

  if (filteredDataNotFound) return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;
  if (details?.length === 0) return <Style.NotFoundList>선택하신 조건에 맞는 벌금 내역이 없습니다.</Style.NotFoundList>;

  return (
    <Style.DetailList>
      {details?.map((detail, i) => {
        const { date, nickname, amount, memo, eventId, ground } = detail;
        return (
          <Style.TableRow key={i} isSelected={selectedFine.eventId === eventId} onClick={() => handleUserDetailModal(detail)}>
            <CheckboxContainer id={String(eventId)} isChecked={eventIdList.includes(eventId)} onChange={() => checkEventList(eventId)}>
              <CheckboxContainer.Checkbox />
            </CheckboxContainer>
            <Style.Element hasEllipsis={false}>{date.slice(2)}</Style.Element>
            <DropDownWrapper openButtonListId={openButtonListId} detail={detail} setOpenButtonListId={setOpenButtonListId} />
            <Style.Element hasEllipsis>{nickname}</Style.Element>
            <Style.Element hasEllipsis>{changeNumberToMoney(amount)}</Style.Element>
            <Style.Element hasEllipsis>
              <span style={{ fontWeight: 600 }}>{ground}&#12539;</span>
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
