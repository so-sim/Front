import { ServerResponse } from '@/types/serverResponse';
import { AxiosError } from 'axios';

export const notFoundGroupDetail = ({ response }: AxiosError<ServerResponse>) => {
  if (response?.data.status.code === 1001) {
    return true;
  }
};
