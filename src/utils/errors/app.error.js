export class HttpError extends Error {
  message;
  statusCode;
  errorCode;
  data;
  constructor(
    message = "http request error",
    statusCode = 400,
    errorCode = "HTTP_ERROR",
    data = {},
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.data = data;
  }
}
