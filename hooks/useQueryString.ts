import { useLocation } from 'react-router-dom';

/**
 * query string을 객체 형태로 사용할 수 있게 해주는 함수
 * @returns: {[key: string]: string}
 */
export interface DateQueryString {
  year: string;
  month: string;
  day: string;
}

export function useQueryString(): DateQueryString {
  const { search } = useLocation();

  return search
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const query = curr.split('=');
      return { ...prev, [query[0]]: query[1] };
    }, {}) as DateQueryString;
}
