import api from '@/api';
import { FormData } from '@/pages/Home/components/Modal/CreateGroupModal';
import { useMutation } from '@tanstack/react-query';

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: (newGroupInfo: FormData) => {
      return api.post('/api/group', newGroupInfo);
    },
  });
};
