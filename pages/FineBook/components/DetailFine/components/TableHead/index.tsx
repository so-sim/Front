import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { FilterMode } from '../..';
import { DateFilterProperty } from '@/pages/FineBook/utils/dateFilter';
import { useParticipantList } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import DropDown from '@/common/DropDown';
import { getStatusCode } from '@/utils/getStatusIcon';
import { PaymentType } from '@/types/event';

interface TableHeadProps {
  setPage: Dispatch<SetStateAction<number>>;
  setDateFilter: Dispatch<SetStateAction<DateFilterProperty>>;
}

type PaymentDropdown = PaymentType | '전체';

export const TableHead: FC<TableHeadProps> = ({ setDateFilter, setPage }) => {
  const param = useParams();

  const { data } = useParticipantList({ groupId: Number(param.groupId) });

  const adminNickname = data?.content.adminNickname;
  const participants = data?.content.nicknameList.map((nickname) => ({ title: nickname }));

  const [openMemberDropdown, setOpenMemberDropdown] = useState(false);
  const [openPaymentTypeDropdown, setOpenPaymentTypeDropdown] = useState(false);

  const memberDropDownRef = useRef<HTMLDivElement>(null);
  const paymentTypeDropDownRef = useRef<HTMLDivElement>(null);

  const [member, setMember] = useState('');

  const [paymentType, setPaymentType] = useState<PaymentDropdown>('');

  const handlePaymentDropDown = () => {
    setOpenPaymentTypeDropdown((prev) => !prev);
  };
  const handleMemeberDropDown = () => {
    setOpenMemberDropdown((prev) => !prev);
  };

  useEffect(() => {
    setPage(0);
    setDateFilter((prev) => ({ ...prev, page: 0, member: member === '전체' ? '' : member, paymentType: paymentType === '전체' ? '' : getStatusCode(paymentType) }));
  }, [member, paymentType]);

  const paymentTypeList: { title: PaymentDropdown; id?: string }[] = [
    { title: '전체' },
    { title: '미납', id: 'filter_nonpayment' },
    { title: '완납', id: 'filter_fullpayment' },
    { title: '확인필요', id: 'filter_confirming' },
  ];

  return (
    <Style.TableHead>
      <Style.Element>날짜</Style.Element>
      <Style.PointerElement onClick={handlePaymentDropDown} ref={paymentTypeDropDownRef} id="filter_payment">
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
            id="filter_payment_drop"
          />
        )}
      </Style.PointerElement>
      <Style.PointerElement ref={memberDropDownRef} onClick={handleMemeberDropDown} id="filter_member">
        <span>팀원</span>
        <Style.Arrow>{ARROW.DOWN_SM}</Style.Arrow>
        {adminNickname && participants && openMemberDropdown && (
          <DropDown
            dropDownRef={memberDropDownRef}
            list={[{ title: '전체' }, ...[...participants, { title: adminNickname }].sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0))]}
            setState={setMember}
            width={208}
            top="40px"
            onClose={handleMemeberDropDown}
            direction="right"
            id="filter_member_drop"
          />
        )}
      </Style.PointerElement>
      <Style.Element>금액</Style.Element>
      <Style.Element>사유</Style.Element>
    </Style.TableHead>
  );
};
