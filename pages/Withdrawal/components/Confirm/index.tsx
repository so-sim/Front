import Button from '@/common/Button';
import { WITHDRWWAL_LIST } from '@/constants/Withdrawal';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import * as Style from './styles';

interface WithdrawalConfirmProps {
  setPageState: Dispatch<SetStateAction<'CONFIRM' | 'REASON'>>;
}

const WithdrawalConfirm: FC<WithdrawalConfirmProps> = ({ setPageState }) => {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck((prev) => !prev);
  };

  const onClickButton = () => {
    setPageState('REASON');
  };

  return (
    <>
      <Style.UlContainer>
        {WITHDRWWAL_LIST.map((list) => (
          <React.Fragment key={list.title}>
            <Style.Li>{list.title}</Style.Li>
            <ul>
              {list.desc?.map((desc) => (
                <Style.Desc key={desc}>
                  <Style.Li>{desc}</Style.Li>
                </Style.Desc>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </Style.UlContainer>
      <Style.Label>
        <input type="checkbox" checked={check} onChange={handleCheck} />
        회원 탈퇴에 관한 모든 내용을 확인했습니다.
        <span>*</span>
      </Style.Label>
      <Style.Footer>
        <Button color={check ? 'primary' : 'disabled'} onClick={onClickButton}>
          다음
        </Button>
      </Style.Footer>
    </>
  );
};

export default WithdrawalConfirm;
