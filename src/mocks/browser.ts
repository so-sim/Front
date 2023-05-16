import { setupWorker, SetupWorkerApi } from 'msw';
import { handler } from './handler';

export const worker: SetupWorkerApi = setupWorker(...handler);
