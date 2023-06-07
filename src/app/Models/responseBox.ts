export interface ResponseBox<T> {
  status: number;
  text: string;
  result: T;
}
