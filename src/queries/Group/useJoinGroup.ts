import { joinGroup } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types/serverResponse';
import { GroupDetail } from '@/types/group';

interface UseJoinGroupProps {
  setError: <P extends 'nickname'>(target: P, message: string) => string;
  groupId: number;
}

export const useJoinGroup = ({ setError, groupId }: UseJoinGroupProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(joinGroup, {
    onMutate: async (context) => {
      await queryClient.cancelQueries(['groupDetail', groupId]);
      const prevData = queryClient.getQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId]);

      if (prevData) {
        queryClient.setQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId], {
          ...prevData,
          content: {
            ...prevData.content,
            isInto: true,
          },
        });
      }

      return { prevData };
    },
    onSuccess: (data) => {
      navigate(`/group/${groupId}/book`);
    },

    onError: (error, value, context) => {
      const axiosError = error as unknown as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as ServerResponse;
        setError('nickname', data.status.message);
      } else {
        ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
      }

      if (context?.prevData) {
        queryClient.setQueryData(['groupDetail', value.groupId], context.prevData);
      }
    },
    onSettled: (context) => {
      queryClient.invalidateQueries(['groupDetail', groupId]);
    },
  });
};
