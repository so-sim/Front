import React, { useEffect } from 'react';
import { useGroupList } from '@/queries/Group';
import { useInView } from 'react-intersection-observer';

const useInfinityGroupList = () => {
  const { ref, inView } = useInView();
  const { data: groups, fetchNextPage, hasNextPage } = useGroupList();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return { groups, ref, hasNextPage };
};

export default useInfinityGroupList;
