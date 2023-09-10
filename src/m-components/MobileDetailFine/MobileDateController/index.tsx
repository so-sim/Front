import { ARROW } from '@/assets/icons/Arrow';
import { useDateFilter } from '@/components/DetailFine/DateController/hook/useDateFilter';
import * as Style from './styles';

const MobileDateController = () => {
  const { getTitle, increaseDate, decreaseDate } = useDateFilter();

  return (
    <Style.Row>
      <Style.ArrowButton onClick={decreaseDate}>{ARROW.LEFT}</Style.ArrowButton>
      <div>{getTitle()}</div>
      <Style.ArrowButton onClick={increaseDate}>{ARROW.RIGHT}</Style.ArrowButton>
    </Style.Row>
  );
};

export default MobileDateController;
