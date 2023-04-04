import { AxiosError } from 'axios';
import { getGroupList } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/acceessToken';

export const useGroupList = () => {
  return useInfiniteQuery(['groupList'], ({ pageParam = 0 }) => getGroupList(pageParam), {
    onError: (error) => {
      const { response } = error as unknown as AxiosError;
      if (response) {
        if (response.status !== 400) {
          ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
        }
      }
    },
    enabled: !!getAccessToken(),
  });
};
