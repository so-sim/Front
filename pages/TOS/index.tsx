import React, { useState } from 'react';
import { ARROW } from '../../assets/icons/Arrow';
import { LOGO } from '../../assets/icons/Logo';
import Button from '../../common/Button';
import * as Style from './styles';

interface TOS {
  id: number;
  title: string;
  href: string;
}

const TOSList: TOS[] = [
  { id: 1, title: '(필수)개인정보수집 동의', href: '' },
  { id: 2, title: '(필수)이용약관 동의', href: '' },
];

const TOS = () => {
  const [checkedList, setCheckedList] = useState<TOS[]>([]);

  const checkedItemHandler = (tos: TOS, isChecked: boolean) => {
    if (isChecked) {
      return setCheckedList((prev) => [...prev, tos]);
    }
    setCheckedList(checkedList.filter((checked) => checked.id !== tos.id));
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, tos: TOS) => {
    checkedItemHandler(tos, e.target.checked);
  };

  const allCheckHandler = () => {
    if (isAllChecked) {
      setCheckedList([]);
    } else {
      setCheckedList([...TOSList]);
    }
  };

  const isAllChecked = checkedList.length === TOSList.length;

  return (
    <>
      <Style.Layout>
        {LOGO.LG}
        <Style.TOSContainer>
          <Style.TOSTitle>약관동의</Style.TOSTitle>
          <span>아래의 내용 확인 후 동의해 주세요.</span>
          <Style.TOSList>
            <Style.TOSWhole>
              <label>
                <input type="checkbox" checked={isAllChecked} onClick={allCheckHandler} />
                <span>전체 약관 모두 동의</span>
              </label>
            </Style.TOSWhole>
            {TOSList.map((list) => (
              <Style.TOS key={list.id}>
                <label>
                  <input type="checkbox" checked={checkedList.includes(list)} onChange={(event) => checkHandler(event, list)} />
                  <span>{list.title}</span>
                </label>
                <Style.TOSLink href={list.href} target="_blank" rel="noopnner noreferrer">
                  {ARROW.RIGHT}
                </Style.TOSLink>
              </Style.TOS>
            ))}
          </Style.TOSList>
          <Style.TOSFooter>
            <Button color={isAllChecked ? 'primary' : 'disabled'}>가입</Button>
          </Style.TOSFooter>
        </Style.TOSContainer>
      </Style.Layout>
    </>
  );
};

export default TOS;
