import { userState } from '@/store/userState';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Calendar from '../../common/Calendar';
import DetailFine from './components/DetailFine';
import * as Style from './styles';

const FineBook = () => {
  const user = useRecoilValue(userState);
  useEffect(() => {
    if (user.userId) {
      window.dataLayer.push({ user_id: user.userId });
    }
  }, [user.userId]);

  return (
    <Style.Layout>
      <Calendar cellType="Mark" />
      <DetailFine />
    </Style.Layout>
  );
};

export default FineBook;
