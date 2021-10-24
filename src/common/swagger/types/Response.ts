export type Response<T> = {
  trackingId: string;
  status: string;
  payload: T;
};
