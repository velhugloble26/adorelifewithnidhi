export class AppError extends Error {
  constructor(
    message,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR"
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const BadRequestError = (
  message = "Bad request",
  code = "BAD_REQUEST"
) => {
  return new AppError(message, 400, code);
};

export const UnauthorizedError = (
  message = "Unauthorized",
  code = "UNAUTHORIZED"
) => {
  return new AppError(message, 401, code);
};

export const ForbiddenError = (
  message = "Access denied",
  code = "FORBIDDEN"
) => {
  return new AppError(message, 403, code);
};

export const NotFoundError = (
  message = "Resource not found",
  code = "NOT_FOUND"
) => {
  return new AppError(message, 404, code);
};

export const ConflictError = (
  message = "Resource already exists",
  code = "CONFLICT"
) => {
  return new AppError(message, 409, code);
};

export const UnprocessableEntityError = (
  message = "Unprocessable entity",
  code = "UNPROCESSABLE_ENTITY"
) => {
  return new AppError(message, 422, code);
};

export function getErrorResponse(error) {
  // Our application errors
  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // MongoDB duplicate key error
  if (error?.code === 11000) {
    const duplicateField =
      Object.keys(error.keyValue || {})[0];

    return {
      success: false,
      message: duplicateField
        ? `${duplicateField} already exists.`
        : "A record with this value already exists.",
      code: "DUPLICATE_KEY",
      statusCode: 409,
    };
  }

  // Mongoose validation error
  if (error?.name === "ValidationError") {
    const errors = Object.values(
      error.errors || {}
    ).map((item) => item.message);

    return {
      success: false,
      message: "Validation failed.",
      code: "VALIDATION_ERROR",
      errors,
      statusCode: 422,
    };
  }

  // Mongoose cast error
  if (error?.name === "CastError") {
    return {
      success: false,
      message: "Invalid resource identifier.",
      code: "INVALID_ID",
      statusCode: 400,
    };
  }

  // Unknown error
  console.error("Unhandled Error:", error);

  return {
    success: false,
    message: "Internal server error.",
    code: "INTERNAL_SERVER_ERROR",
    statusCode: 500,
  };
}