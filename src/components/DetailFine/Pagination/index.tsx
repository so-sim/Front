import { Dispatch, SetStateAction } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { DetailFilter } from '@/utils/dateFilter/dateFilter';

type Props = {
  totalCount?: number;
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
};

const ITEMS_PER_PAGE = 16;

const Pagination = ({ totalCount = 0, detailFilter, setDetailFilter }: Props) => {
  if (totalCount < ITEMS_PER_PAGE) return null;

  const pageCount = Math.ceil(totalCount / 16 || 1);

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
