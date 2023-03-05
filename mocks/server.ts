import { setupServer, SetupServerApi } from 'msw/node';
import { handler } from './handler';

export const server: SetupServerApi = setupServer(...handler);
