import apiResponse from "./common/apiResponse";

export const success = (message, data, statusCode) =>
  apiResponse.success(message, data, statusCode);

export const serverError = (message) =>
  apiResponse.serverError(message);

export const validationError = (errors, statusCode = 422) =>
  apiResponse.validationError("Validation failed.", errors, statusCode);
