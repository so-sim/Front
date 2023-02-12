import React, { useState } from 'react';
import { ARROW } from '../../assets/icons/Arrow';
import { LOGO } from '../../assets/icons/Logo';
import Button from '../../common/Button';
import * as Style from './styles';

const TOSList = [
  { id: 1, title: '(필수)개인정보수집 동의', href: '' },
  { id: 2, title: '(필수)이용약관 동의', href: '' },
];

const TOS = () => {
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const checkedItemHandler = (id: number, isChecked: boolean) => {
    if (isChecked) {
      return setCheckedList((prev) => [...prev, id]);
    }
    setCheckedList(checkedList.filter((list) => list !== id));
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    checkedItemHandler(id, e.target.checked);
  };

  const allCheckHandler = () => {
    if (isAllChecked) {
      setCheckedList([]);
    } else {
      const arr: number[] = [];
      TOSList.map((list) => {
        arr.push(list.id);
      });
      setCheckedList(arr);
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
                  <input type="checkbox" checked={checkedList.includes(list.id)} onChange={(event) => checkHandler(event, list.id)} />
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
