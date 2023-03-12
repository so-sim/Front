export interface ServerResponse<T = null> {
  message: string;
  content: T;
}
