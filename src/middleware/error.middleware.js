export const globalErrorHandling = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    // errorDetails: err,
    errorMessage: err.message || "Something went wrong",
    statusCode: err.statusCode,
    errorBody: err.data,
    errorCode: err.errorCode || "INTERNAL_SERVER_ERROR",
    errorStack: err.stack,
  });
};

