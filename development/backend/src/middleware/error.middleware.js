export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const errorCode = err.code || (statusCode === 500 ? "INTERNAL_SERVER_ERROR" : "BAD_REQUEST");
  const message = err.message || "An unexpected server error occurred";

  // Redact stack traces in production / test responses
  const details = process.env.NODE_ENV === "development" ? { stack: err.stack } : {};

  res.status(statusCode).json({
    error: {
      code: errorCode,
      message,
      details,
    },
  });
}
