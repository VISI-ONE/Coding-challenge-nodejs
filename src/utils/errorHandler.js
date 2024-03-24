class CustomError extends Error {
  constructor(message = "An error occurred", statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function throwErrorWithStatus(message, statusCode) {
  throw new CustomError(message, statusCode);
}
