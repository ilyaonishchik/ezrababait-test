export type RTKQueryError = {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
  status: number;
};
