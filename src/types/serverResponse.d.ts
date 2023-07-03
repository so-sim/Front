export interface ServerResponse<T = null> {
  status: { code: number; message: string };
  content: T;
  nextPage?: number;
}
