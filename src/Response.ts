export interface Response<T> {
  success: false;
  error?: string;
  result?: T;
}
