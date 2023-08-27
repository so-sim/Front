import { SYSTEM } from '@/assets/icons/System';
import WithdrawBadge from '@/components/@common/WithdrawBadge';
import useSearchParticipant from '@/hooks/Member/useSearchParticipant';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import * as Style from './styles';

type Props = {
  updateDetailFilterNickname: (nickname: string) => void;
  initialNickname: string;
};

export const AutoComplete = ({ updateDetailFilterNickname, initialNickname }: Props) => {
  const [nicknameIndex, setNicknameIndex] = useState<null | number>(null);
  const [focusInput, setFocusInput] = useState(false);

  const toggleFocusInput = () => {
    setFocusInput((prev) => !prev);
  };

  const { nickname, searchNickname, filteredMemberList, initNickname, inputRef } = useSearchParticipant(initialNickname);

  const handleSearchNicknameByKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      return initNickname();
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

    if (e.key === 'Enter' && nicknameIndex !== null && filteredMemberList[nicknameIndex] !== undefined) {
      updateDetailFilterNickname(filteredMemberList[nicknameIndex].nickname);
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
        onChange={searchNickname}
        onFocus={toggleFocusInput}
        onKeyDown={handleSearchNicknameByKeyboard}
        onBlur={() => setTimeout(toggleFocusInput, 200)}
        ref={inputRef}
      />
      {focusInput && (
        <Style.DropDownContainer>
          {filteredMemberList.length > 0 ? (
            filteredMemberList.map(({ nickname, withdraw }, idx) => {
              return (
                <Style.MemberListItem //
                  key={nickname}
                  isSelectedIdx={idx === nicknameIndex}
                  onClick={() => updateDetailFilterNickname(nickname)}
                >
                  {SYSTEM.SEARCH_GRAY}
                  <span>{nickname}</span>
                  {withdraw && <WithdrawBadge />}
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
