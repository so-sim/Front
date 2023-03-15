import React, { Dispatch, SetStateAction, useState } from 'react';
import { Details } from '../..';
import { SYSTEM } from '../../../../../../assets/icons/System';
import { USER } from '../../../../../../assets/icons/User';
import Button from '../../../../../../common/Button';
import { Label } from '../../../../../../common/Label';
import { DropBox } from '../../../../../../common/DropBox';
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
    <Style.UserDetailsFrame>
      <Style.Header>
        <Style.Block>
          <Style.CloseIcon onClick={() => setOpen(false)}>{SYSTEM.CLOSE}</Style.CloseIcon>
          <span>닫기</span>
        </Style.Block>
      </Style.Header>
      <Style.UserDetailsContent>
        <Style.Block>
          <span>{USER.PERSON_XL}</span>
          <span>{name}</span>
        </Style.Block>
        <div>{fine}원</div>
        <Style.Row>
          <Label title="날짜" width="32px">
            <DropBox color="disabled" boxWidth="138px" width={138} setType={setA} type={a} dropDownList={statusList} />
          </Label>
          <Label title="납부여부" width="80px">
            <DropBox color="white" boxWidth="138px" width={138} setType={setA} type={a} dropDownList={statusList} />
          </Label>
        </Style.Row>
        <Label title="사유" width="30px">
          <Style.TextArea disabled placeholder="내용을 입력해주세요.">
            {reason}
          </Style.TextArea>
        </Label>
      </Style.UserDetailsContent>
      <Style.Footer>
        <Button onClick={() => console.log('hi')} color="white">
          삭제
        </Button>
        <Button onClick={() => console.log('hi')} color="black">
          수정
        </Button>
      </Style.Footer>
    </Style.UserDetailsFrame>
  );
};
