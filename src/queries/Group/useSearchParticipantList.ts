import { searchParticipantList } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useSearchParticipantList = (groupId: number | undefined, keyword: string) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  useEffect(() => {
    let debounce = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 250);

    return () => clearTimeout(debounce);
  }, [keyword]);
  return useQuery(['participantList', groupId, debouncedKeyword], () => searchParticipantList(groupId, debouncedKeyword));
};
