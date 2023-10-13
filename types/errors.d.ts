type ErrorDataType = {
  error: string;
  messages: string;
  statusCode: number;
};

type CustomerError = {
  data: ErrorDataType;
  status: number;
};
