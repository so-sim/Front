import { detailHandler } from './api/detailHandler';
import { groupHandler } from './api/groupHandler';

export const handler = [...groupHandler, ...detailHandler];
