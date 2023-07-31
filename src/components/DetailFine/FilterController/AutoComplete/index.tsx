import { SYSTEM } from '@/assets/icons/System';
import { useParticipantList } from '@/queries/Group';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

type Props = {
  updateDetailFilterNickname: (nickname: string) => void;
  initialNickname: string;
};

export const AutoComplete = ({ updateDetailFilterNickname, initialNickname }: Props) => {
  const { groupId } = useParams();

  const [nickname, setNickname] = useState(initialNickname);
  const [nicknameIndex, setNicknameIndex] = useState<null | number>(null);
  const [focusInput, setFocusInput] = useState(false);
  const autoCompleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initialNickname !== '' && autoCompleteInputRef.current?.focus();
  }, []);

  const { data } = useParticipantList(Number(groupId));
  // const { data: searchedParticipantList } = useSearchParticipantList(Number(groupId), nickname);
  const searchMemberList = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const toggleFocusInput = () => {
    setFocusInput((prev) => !prev);
  };

  const removeSpace = (string: string) => {
    return string.replaceAll(' ', '');
  };

  const searchMemberByNickname = (nicknameList: string[], keyword: string): string[] => {
    return nicknameList.filter((nickname) => removeSpace(nickname).includes(removeSpace(keyword)));
  };

  const nicknameList = [...(data?.content.nicknameList ?? []), data?.content.adminNickname ?? ''] ?? [];
  const filteredMemberList = searchMemberByNickname(nicknameList, nickname);

  const handleSearchNicknameByKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      return setNickname('');
    }
    if (e.key === 'ArrowDown') {
      return setNicknameIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, filteredMemberList.length - 1)));
    }
    if (e.key === 'ArrowUp') {
      setNicknameIndex((prev) => {
        if (prev === null) return prev;
        return prev === 0 ? null : prev - 1;
      });
    }
    if (e.key === 'Enter' && nicknameIndex !== null && typeof filteredMemberList[nicknameIndex] === 'string') {
      updateDetailFilterNickname(filteredMemberList[nicknameIndex]);
      setNicknameIndex(null);
    }
  };

  useEffect(() => {
    setNicknameIndex(null);
  }, [nickname]);

  return (
    <Style.AutoCompleteContainer>
      <Style.SearchBar
        type="text" //
        placeholder="팀원을 검색해주세요."
        value={nickname}
        onChange={searchMemberList}
        onFocus={toggleFocusInput}
        onKeyDown={handleSearchNicknameByKeyboard}
        onBlur={() => setTimeout(toggleFocusInput, 200)}
        ref={autoCompleteInputRef}
      />
      {focusInput && (
        <Style.DropDownContainer>
          {filteredMemberList.length > 0 ? (
            filteredMemberList.map((name, idx) => {
              return (
                <Style.MemberListItem //
                  key={name}
                  isSelectedIdx={idx === nicknameIndex}
                  onClick={() => updateDetailFilterNickname(name)}
                >
                  {SYSTEM.SEARCH_GRAY}
                  <span>{name}</span>
                  <Style.WithdrawButton>탈퇴</Style.WithdrawButton>
                </Style.MemberListItem>
              );
            })
          ) : (
            <Style.NotFoundResult>
              {SYSTEM.SEARCH_GRAY_LG}
              <div>검색 결과가 없습니다.</div>
            </Style.NotFoundResult>
          )}
        </Style.DropDownContainer>
      )}
    </Style.AutoCompleteContainer>
  );
};
