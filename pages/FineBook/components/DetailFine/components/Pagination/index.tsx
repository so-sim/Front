import { Dispatch, FC, SetStateAction } from 'react';
import { Details } from '../..';
import { ARROW } from '../../../../../../assets/icons/Arrow';
import * as Style from './styles';

interface PaginationProps {
  details: Details[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: FC<PaginationProps> = ({ details, page, setPage }) => {
  return (
    <Style.Pagination>
      <Style.DoubleArrow>{ARROW.DOUBLE_LEFT}</Style.DoubleArrow>
      {new Array(Math.ceil(details.length / 16)).fill(0).map((_, i) => {
        const pageNumber = i + 1;
        return (
          <Style.Page
            onClick={() => {
              setPage(pageNumber);
            }}
            isSelected={page === pageNumber}
          >
            {pageNumber}
          </Style.Page>
        );
      })}
      <Style.DoubleArrow>{ARROW.DOUBLE_RIGHT}</Style.DoubleArrow>
    </Style.Pagination>
  );
};
