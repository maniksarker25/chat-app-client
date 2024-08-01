export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
