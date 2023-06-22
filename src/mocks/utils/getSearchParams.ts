import { PathParams, RestRequest } from 'msw';

export const getSearchParams = (req: RestRequest<never, PathParams<string>>, param: string) => {
  return req.url.searchParams.get(param);
};
