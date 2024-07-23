type fetchResponseType<T> = {
  data: T;
  message: string;
  // todo: add error object too
  error: any
};
