import { CIRCLE_DROP } from '@/assets/icons/CircleDrop';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case '미납':
      return CIRCLE_DROP.RED;
    case '확인필요':
      return CIRCLE_DROP.YELLOW;
    case '완납':
      return CIRCLE_DROP.BLUE;
  }
};
