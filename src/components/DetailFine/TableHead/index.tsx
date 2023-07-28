import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { useParticipantList } from '@/queries/Group';
import { useParams, useSearchParams } from 'react-router-dom';
import DropDown from '@/components/@common/DropDown';
import { GA } from '@/constants/GA';
import { DetailFilter } from '@/store/detailFilter';
import CheckboxContainer from '../../@common/Checkbox';
import { SelectedEventInfo } from '@/types/event';
import { CheckDetailFine, SetCheckDetailFine } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import DetailListCheckBox from '../checkbox';

type Props = {
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
  details?: SelectedEventInfo[];

  checkDetailFine: CheckDetailFine;
  setCheckDetailFine: SetCheckDetailFine;
};

type PaymentDropdown = '전체' | '미납' | '완납' | '확인중';

const paymentTypeList: { title: PaymentDropdown; id?: string }[] = [
  { title: '전체' },
  { title: '미납', id: GA.FILTER.NON },
  { title: '완납', id: GA.FILTER.FULL },
  { title: '확인중', id: GA.FILTER.CON },
];

const TableHead = ({ details, setDetailFilter, checkDetailFine, setCheckDetailFine }: Props) => {
  const param = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const [member, setMember] = useState('전체');
  const [paymentType, setPaymentType] = useState<PaymentDropdown>('전체');
  const [openMemberDropdown, setOpenMemberDropdown] = useState(false);
  const [openPaymentTypeDropdown, setOpenPaymentTypeDropdown] = useState(false);
  const { setAddCheckDetailFine, setSubtractCheckDetailFine, setInitCheckDetailFine } = setCheckDetailFine;

  const memberDropDownRef = useRef<HTMLDivElement>(null);
  const paymentTypeDropDownRef = useRef<HTMLDivElement>(null);

  const { data } = useParticipantList(Number(param.groupId));

  useEffect(() => {
    setDetailFilter((prev) => ({
      ...prev,
      page: 0,
      situation: paymentType === '전체' ? '' : paymentType,
      nickname: member === '전체' ? '' : member,
    }));
  }, [member, paymentType]);

  const adminNickname = data?.content.adminNickname;
  const participants = data?.content.nicknameList.map((nickname) => ({ title: nickname }));

  const handlePaymentDropDown = () => {
    setOpenPaymentTypeDropdown((prev) => !prev);
  };

  const handleMemeberDropDown = () => {
    setOpenMemberDropdown((prev) => !prev);
  };

  const getParticipantList = () => {
    if (!participants || !adminNickname) return [{ title: '전체' }];
    const joinParticipants = [...participants, { title: adminNickname }].sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

    return [{ title: '전체' }, ...joinParticipants];
  };

  const isCheckedAll = details?.every((item) => Object.keys(checkDetailFine).includes(String(item.eventId)));

  const checkedAllProperty = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCheckedAll) {
      details?.forEach((item) => {
        setSubtractCheckDetailFine(item);
      });
      return;
    }

    details?.forEach((item) => {
      setAddCheckDetailFine(item);
    });
  };

  const initCheckDetailFine = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setInitCheckDetailFine();
  };

  return (
    <Style.TableHead>
      <CheckboxContainer id={'checkedAll'} isChecked={!!isCheckedAll && details?.length! > 0} onChange={(event: React.ChangeEvent<HTMLInputElement>) => checkedAllProperty(event)}>
        <CheckboxContainer.Checkbox as={DetailListCheckBox} />
      </CheckboxContainer>

      <Style.Element>날짜</Style.Element>
      <Style.PointerElement onClick={handlePaymentDropDown} ref={paymentTypeDropDownRef}>
        <span>납부여부</span>
        <Style.Arrow>{ARROW.DOWN_SM}</Style.Arrow>
        {openPaymentTypeDropdown && (
          <DropDown
            list={paymentTypeList}
            setState={setPaymentType}
            width={102}
            top="40px"
            onClose={handlePaymentDropDown}
            direction="right"
            dropDownRef={paymentTypeDropDownRef}
            id={GA.FILTER.PAYMENT_BUTTON}
          />
        )}
      </Style.PointerElement>
      <Style.PointerElement ref={memberDropDownRef} onClick={handleMemeberDropDown}>
        <span>팀원</span>
        <Style.Arrow>{ARROW.DOWN_SM}</Style.Arrow>
        {openMemberDropdown && (
          <DropDown
            dropDownRef={memberDropDownRef}
            list={getParticipantList().map((v) => ({ ...v, id: GA.FILTER.MEMBER_DROP }))}
            setState={setMember}
            width={208}
            top="40px"
            onClose={handleMemeberDropDown}
            direction="right"
            id={GA.FILTER.MEMBER_BUTTON}
          />
        )}
      </Style.PointerElement>
      <Style.Element>금액</Style.Element>
      <Style.Element>사유</Style.Element>
    </Style.TableHead>
  );
};

export default TableHead;

// {!(Object.keys(checkDetailFine).length === 0) && (
//   <Style.SituationControlWrapper>
//     <CheckboxContainer
//       id={'checkDetailFineLength'}
//       isChecked={!(Object.keys(checkDetailFine).length === 0)}
//       onChange={(event: React.MouseEvent<HTMLInputElement>) => initCheckDetailFine(event)}
//     >
//       <CheckboxContainer.Checkbox
//         as={React.forwardRef<HTMLInputElement, { id: string; isChecked: boolean; onChange: (event: React.MouseEvent<HTMLInputElement>) => void }>(
//           ({ id, isChecked, onChange, ...props }, ref) => {
//             return <input type="checkbox" readOnly onClick={onChange} checked={isChecked} id={id} ref={ref} />;
//           },
//         )}
//       />
//     </CheckboxContainer>
//     {/* 여기 onChange는 임시 cache역할을 만들어서 비우고 다시 채우는 역할??  근데 비우면 없어짐  그래서 그냥 cache 필요없이 지우는 역할을 해야할 것 같다.  */}
//     {/* fixed는 논의 후 추가 */}
//     <Style.Label>{Object.keys(checkDetailFine).length}개 선택</Style.Label>
//     <Style.DividingLine />
//     <Style.SituationControlButton
//       onClick={() => {
//         searchParams.set('type', 'situation_change');
//         setSearchParams(searchParams, { replace: true });
//       }}
//     >
//       납부여부 변경
//     </Style.SituationControlButton>
//     <Style.DividingLine />
//     <Style.SituationControlButton
//       onClick={() => {
//         searchParams.set('type', 'alarm_request');
//         setSearchParams(searchParams, { replace: true });
//       }}
//     >
//       납부요청
//     </Style.SituationControlButton>
//   </Style.SituationControlWrapper>
// )}
