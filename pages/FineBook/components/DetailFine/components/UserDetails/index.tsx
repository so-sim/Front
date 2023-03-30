import React, { Dispatch, SetStateAction, useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import Button from '@/common/Button';
import { Label } from '@/common/Label';
import { DropBox } from '@/common/DropBox';
import * as Style from './styles';
import { EvnetInfo, PaymentType } from '@/types/event';
import { FineBookModal } from '@/common/Modal/FineBookModal';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { getStatusText } from '@/utils/getStatusIcon';

interface UserDetailsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  select: EvnetInfo;
}

export const UserDetails = ({ open, setOpen, select }: UserDetailsProps) => {
  if (!open) return null;
  const { userId, eventId, groundsDate, paymentType, userName, payment, grounds } = select;
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const statusList: { title: PaymentType }[] = [{ title: '미납' }, { title: '완납' }, { title: '확인필요' }];
  const [newStatus, setNewStatus] = useState<PaymentType>('');

  return (
    <>
      <Style.UserDetailsFrame>
        <Style.Header>
          <Style.CloseIcon onClick={() => setOpen(false)}>{SYSTEM.CLOSE}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Header>
        <Style.UserDetailsContent>
          <Style.Block>
            <Style.PersonIcon>{USER.PERSON_XL}</Style.PersonIcon>
            <Style.Text>{userName}</Style.Text>
          </Style.Block>
          <Style.Block>
            <Style.Text>{changeNumberToMoney(payment)}원</Style.Text>
          </Style.Block>
          <Style.Row>
            <Label title="날짜" width="32px">
              <DropBox color="disabled" boxWidth="110px" width={110} type={groundsDate.split(' ')[0]} dropDownList={statusList} />
            </Label>
            <Label title="납부여부" width="80px">
              <DropBox
                color="white"
                boxWidth="112px"
                width={112}
                setType={setNewStatus}
                type={newStatus || getStatusText(paymentType)}
                dropDownList={statusList.filter((status) => {
                  if (newStatus) {
                    return status.title !== newStatus;
                  } else {
                    return status.title !== getStatusText(paymentType);
                  }
                })}
              />
            </Label>
          </Style.Row>
          <Label title="사유" width="30px">
            <Style.TextArea disabled placeholder="내용을 입력해주세요.">
              {grounds}
            </Style.TextArea>
          </Label>
        </Style.UserDetailsContent>
        <Style.Footer>
          <Button onClick={() => console.log('hi')} color="white">
            삭제
          </Button>
          <Button onClick={() => setOpenUpdateModal(true)} color="black">
            수정
          </Button>
        </Style.Footer>
      </Style.UserDetailsFrame>
      {openUpdateModal && <FineBookModal eventId={eventId} setOpen={setOpenUpdateModal} />}
    </>
  );
};
