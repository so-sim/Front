import { SYSTEM } from '@/assets/icons/System';
import { DropDown } from '@/components/@common';
import { DetailFilter } from '@/store/detailFilter';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import * as Style from './styles';

type Props = {
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
};

const TEMP_MEMBER_LIST = ['윤하나', '윤둘', '윤셋'];

export const AutoComplete = ({ setDetailFilter }: Props) => {
  const [nickname, setNickname] = useState('');
  const [openDrop, setOpenDrop] = useState(true);
  const dropDownRef = useRef(null);
  const searchMemberList = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const updateDetailFilterNickname = (nickname: string) => {
    setDetailFilter((prev) => ({ ...prev, nickname }));
  };

  //Todo: 이건 useQuery 훅 안에서 사용하는 것이 좋을듯
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
    <Style.AutoCompleteContainer>
      <Style.SearchBar
        type="text" //
        placeholder="팀원을 검색해주세요."
        value={nickname}
        onChange={searchMemberList}
      />
      <Style.DropDownContainer>
        {openDrop && (
          <DropDown
            dropDownRef={dropDownRef}
            top="16px"
            onClose={() => setOpenDrop(false)}
            list={TEMP_MEMBER_LIST.map((v) => ({ title: v, svg: SYSTEM.SEARCH_GRAY }))}
            setState={updateDetailFilterNickname}
          />
        )}
      </Style.DropDownContainer>
    </Style.AutoCompleteContainer>
  );
};
