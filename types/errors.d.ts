type ErrorDataType = {
  error: string;
  messages: string | ErrorMessage | ErrorMessages[];
  statusCode: number;
};

type ErrorMessages = {
  message: string,
  field: 'password' | 'email' | 'name';
}

type CustomerError = {
  data: ErrorDataType;
  status: number;
};

type RTKError = {
  error: Error
}
