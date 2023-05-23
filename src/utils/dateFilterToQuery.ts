import { DateFilterProperty } from './dateFilter/dateFilter';

export const dateFilterToQuery = (dateFilterProperty: Partial<DateFilterProperty>): string => {
  const queries = Object.entries(dateFilterProperty)
    .filter((property) => property[1] !== null && property[1] !== '')
    .reduce((prev, curr) => `${prev}&${curr[0]}=${curr[1]}`, '')
    .slice(1);

  return queries;
};
