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
import CheckedHandleModal from './CheckedHandleModal';

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

  const checkedAllProperty = (event: React.MouseEvent<HTMLInputElement>) => {
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

  return (
    <Style.TableHead>
      <CheckboxContainer id={'checkedAll'} isChecked={!!isCheckedAll && details?.length! > 0} onChange={(event: React.MouseEvent<HTMLInputElement>) => checkedAllProperty(event)}>
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
      <CheckedHandleModal checkDetailFine={checkDetailFine} setCheckDetailFine={setCheckDetailFine} />
    </Style.TableHead>
  );
};

export default TableHead;
