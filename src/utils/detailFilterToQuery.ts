import { DetailFilter } from '@/store/detailFilter';

export const detailFilterToQuery = (detailFilter: Partial<any>): string => {
  const queries = Object.entries(detailFilter)
    .filter((property) => property[1] !== null && property[1] !== '')
    .reduce((prev, curr) => `${prev}&${curr[0]}=${curr[1]}`, '')
    .slice(1);

  return queries;
};
