import Calendar from '@/components/@common/Calendar';
import DetailFine from './DetailFine';
import * as Style from './styles';

const FineBook = () => {
  return (
    <Style.Layout>
      <Calendar cellType="Mark" />
      <DetailFine />
    </Style.Layout>
  );
};

export default FineBook;
