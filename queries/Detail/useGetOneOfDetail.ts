import { getOneOfEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useQuery } from '@tanstack/react-query';

export const useGetOneOfDetail = (eventId: number) => {
  return useQuery(['oneOfDetail', eventId], () => getOneOfEvent(eventId));
};
