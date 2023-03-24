export interface ServerResponse<T = null> {
  status: { code: string; message: string };
  content: T;
}
