import { Dispatch, SetStateAction } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { DetailFilter } from '@/store/detailFilter';

type Props = {
  totalCount?: number;
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
  addref: <T extends HTMLSpanElement & HTMLDivElement>(ref: T) => void;
};

const ITEMS_PER_PAGE = 16;

const Pagination = ({ totalCount = 0, detailFilter, setDetailFilter, addref }: Props) => {
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
    <Style.Pagination ref={addref}>
      <Style.DoubleArrow onClick={decreasePage} ref={addref}>
        {ARROW.DOUBLE_LEFT}
      </Style.DoubleArrow>
      {new Array(pageCount).fill(0).map((_, i) => {
        return (
          <Style.Page key={i} onClick={() => moveToPage(i)} isSelected={detailFilter.page === i} ref={addref}>
            {i + 1}
          </Style.Page>
        );
      })}
      <Style.DoubleArrow onClick={increasePage} ref={addref}>
        {ARROW.DOUBLE_RIGHT}
      </Style.DoubleArrow>
    </Style.Pagination>
  );
};
export default Pagination;
