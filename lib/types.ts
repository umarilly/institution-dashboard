type fetchResponseType<T> = {
  data: T;
  message: string;
  error: any
};