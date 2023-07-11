import { SYSTEM } from '@/assets/icons/System';
import { DropDown } from '@/components/@common';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as Style from './styles';

type Props = {
  updateDetailFilterNickname: (nickname: string) => void;
  initialNickname: string;
};

const TEMP_MEMBER_LIST = ['윤하나', '윤둘', '윤셋'];

export const AutoComplete = ({ updateDetailFilterNickname, initialNickname }: Props) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [openDrop, setOpenDrop] = useState(true);
  const dropDownRef = useRef(null);
  const searchMemberList = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
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
