import React, { Dispatch, SetStateAction, useState } from 'react';
import { Details } from '../..';
import { SYSTEM } from '../../../../../../assets/icons/System';
import { USER } from '../../../../../../assets/icons/User';
import { Label } from '../../../../../../common/Label';
import { DropBox } from '../../../../../Home/components/Modal/DropBox';
import * as Style from './styles';

interface UserDetailsProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  select: Details;
}

export const UserDetails = ({ open, setOpen, select }: UserDetailsProps) => {
  if (!open) return null;
  const { date, status, name, fine, reason } = select;

  const statusList = [{ title: '미납' }, { title: '완납' }, { title: '확인 필요' }];
  const [a, setA] = useState(status);

  return (
    <div style={{ position: 'absolute', top: 0, background: 'white', width: '576px', right: 0, borderLeft: 'gray', height: '100%' }}>
      <Style.Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Style.CloseIcon onClick={() => setOpen(false)}>{SYSTEM.CLOSE}</Style.CloseIcon>
          <span>닫기</span>
        </div>
      </Style.Header>
      <div style={{ margin: '48px 40px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{USER.PERSON_XL}</span>
          <span>{name}</span>
        </div>
        <div>{fine}원</div>
        <div style={{ display: 'flex', width: '100%' }}>
          <Label title="날짜" width="32px">
            <DropBox color="disabled" boxWidth="138px" width={138} setType={setA} type={a} dropDownList={statusList} />
          </Label>
          <Label title="납부여부" width="80px">
            <DropBox color="white" boxWidth="138px" width={138} setType={setA} type={a} dropDownList={statusList} />
          </Label>
        </div>
        <Label title="사유" width="32px">
          <Style.TextArea disabled placeholder="내용을 입력해주세요.">
            {reason}
          </Style.TextArea>
        </Label>
      </div>
    </div>
  );
};
