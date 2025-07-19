export type commonResponse<T> = {
  message: string;
  timestamp: number;
  data: T;
};
