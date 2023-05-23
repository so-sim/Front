import { Dispatch, FC, SetStateAction } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';

type Props = {
  count?: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ count = 0, page, setPage }: Props) => {
  const pageCount = Math.ceil(count / 16 || 1);

  const increasePage = () => {
    if (page < pageCount - 1) {
      setPage((prev) => prev + 1);
    }
  };
  const decreasePage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <Style.Pagination>
      <Style.DoubleArrow onClick={decreasePage}>{ARROW.DOUBLE_LEFT}</Style.DoubleArrow>
      {new Array(pageCount).fill(0).map((_, i) => {
        return (
          <Style.Page
            onClick={() => {
              setPage(i);
            }}
            isSelected={page === i}
          >
            {i + 1}
          </Style.Page>
        );
      })}
      <Style.DoubleArrow onClick={increasePage}>{ARROW.DOUBLE_RIGHT}</Style.DoubleArrow>
    </Style.Pagination>
  );
};
export default Pagination;
