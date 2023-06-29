import { DetailFilter } from '@/store/detailFilter';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Style from './styles';

type Props = {
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
};

const TEMP_MEMBER_LIST = ['윤하나', '윤둘', '윤셋'];

export const AutoComplete = ({ setDetailFilter }: Props) => {
  const [nickname, setNickname] = useState('');
  const searchMemberList = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const updateDetailFilterNickname = (nickname: string) => {
    setDetailFilter((prev) => ({ ...prev, nickname }));
  };

  useEffect(() => {
    let debounce = setTimeout(() => {
      // 디바운싱 로직
      // invalidate 하는 곳
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [nickname]);

  return (
    <div>
      <Style.SearchBar
        type="text" //
        placeholder="팀원을 검색해주세요."
        value={nickname}
        onChange={searchMemberList}
      />
      <div>
        <ul>
          {TEMP_MEMBER_LIST.map((member) => {
            return (
              <li key={member} onClick={() => updateDetailFilterNickname(member)}>
                {member}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
