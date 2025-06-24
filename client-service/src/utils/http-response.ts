export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  code?: string;
};

export const success = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});

export const failure = (message: string, code?: string): ErrorResponse => ({
  success: false,
  message,
  code,
});
