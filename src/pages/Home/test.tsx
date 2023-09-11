import api from '@/api';
import { useErrorBoundary } from 'react-error-boundary';

const Test = () => {
  const { showBoundary } = useErrorBoundary();
  const test = async () => {
    try {
      const { data } = await api.get(`api/events?groupId=&eventIdList=`);
      return data;
    } catch {
      showBoundary('error');
    }
  };

  return <div onClick={test}>이닝니인이닝ㄴㅇㄴ</div>;
};

export default Test;
