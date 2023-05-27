import { Dispatch, FC, SetStateAction } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { DetailFilter } from '@/utils/dateFilter/dateFilter';

type Props = {
  count?: number;
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
};

const Pagination = ({ count = 0, detailFilter, setDetailFilter }: Props) => {
  const pageCount = Math.ceil(count / 16 || 1);

  const increasePage = () => {
    setDetailFilter((prev) => {
      if (prev.page < pageCount - 1) return { ...prev, page: prev.page + 1 };

      return prev;
    });
  };

  const decreasePage = () => {
    setDetailFilter((prev) => {
      if (prev.page > 0) return { ...prev, page: prev.page - 1 };

      return prev;
    });
  };

  const moveToPage = (page: number) => {
    setDetailFilter((prev) => ({ ...prev, page }));
  };

  return (
    <Style.Pagination>
      <Style.DoubleArrow onClick={decreasePage}>{ARROW.DOUBLE_LEFT}</Style.DoubleArrow>
      {new Array(pageCount).fill(0).map((_, i) => {
        return (
          <Style.Page onClick={() => moveToPage(i)} isSelected={detailFilter.page === i}>
            {i + 1}
          </Style.Page>
        );
      })}
      <Style.DoubleArrow onClick={increasePage}>{ARROW.DOUBLE_RIGHT}</Style.DoubleArrow>
    </Style.Pagination>
  );
};
export default Pagination;
