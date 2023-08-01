import { SYSTEM } from '@/assets/icons/System';
import { DropDown } from '@/components/@common';
import { useSearchParticipantList } from '@/queries/Group/useSearchParticipantList';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

type Props = {
  updateDetailFilterNickname: (nickname: string) => void;
  initialNickname: string;
};

export const AutoComplete = ({ updateDetailFilterNickname, initialNickname }: Props) => {
  const { groupId } = useParams();

  const [nickname, setNickname] = useState(initialNickname);
  const [openDrop, setOpenDrop] = useState(true);
  const [focusInput, setFocusInput] = useState(false);
  const dropDownRef = useRef(null);
  const autoCompleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initialNickname !== '' && autoCompleteInputRef.current?.focus();
  }, []);

  const searchMemberList = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const toggleFocusInput = () => {
    setFocusInput((prev) => !prev);
  };

  const { data: searchedParticipantList } = useSearchParticipantList(Number(groupId), nickname);
  const nicknameList = focusInput ? searchedParticipantList?.content.nicknameList : [];

  return (
    <Style.AutoCompleteContainer>
      <Style.SearchBar
        type="text" //
        placeholder="팀원을 검색해주세요."
        value={nickname}
        onChange={searchMemberList}
        onFocus={toggleFocusInput}
        onBlur={() => setTimeout(toggleFocusInput, 200)}
        ref={autoCompleteInputRef}
      />
      <Style.DropDownContainer>
        {openDrop && (
          <DropDown
            dropDownRef={dropDownRef}
            top="16px"
            onClose={() => setOpenDrop(false)}
            list={nicknameList?.map(({ nickname }) => ({ title: nickname, svg: SYSTEM.SEARCH_GRAY })) ?? []}
            setState={updateDetailFilterNickname}
          />
        )}
      </Style.DropDownContainer>
    </Style.AutoCompleteContainer>
  );
};
