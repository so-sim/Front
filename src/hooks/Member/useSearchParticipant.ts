import { useSearchParticipantList } from '@/queries/Group/useSearchParticipantList';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const useSearchParticipant = (initialNickname: string) => {
  const { groupId } = useParams();
  const autoCompleteInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState(initialNickname);

  const { data } = useSearchParticipantList(Number(groupId), nickname);

  const searchNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const initNickname = () => {
    setNickname('');
  };

  const filteredMemberList = data?.content.nicknameList ?? [];

  useEffect(() => {
    initialNickname !== '' && autoCompleteInputRef.current?.focus();
  }, []);

  return {
    nickname,
    filteredMemberList,
    searchNickname,
    initNickname,
    inputRef: autoCompleteInputRef,
  };
};

export default useSearchParticipant;
