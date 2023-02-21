import { BASE_URL } from './../api/index';
import { rest } from 'msw';

export const handler = [
  rest.get(`${BASE_URL}`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];
