type ErrorDataType = {
  error: string;
  messages: string | {
    message: string,
    field: string;
  };
  statusCode: number;
};

type CustomerError = {
  data: ErrorDataType;
  status: number;
};

type RTKError = {
  error: Error
}
