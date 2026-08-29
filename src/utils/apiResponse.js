import apiResponse from "./common/apiResponse";

export const success = (message, data, statusCode) =>
  apiResponse.success(message, data, statusCode);

export const serverError = (message) =>
  apiResponse.serverError(message);

// Supports both legacy (errors, statusCode) and current
// (message, errors, statusCode) route-handler contracts.
export const validationError = (messageOrErrors, errorsOrStatus = 422, statusCode) => {
  if (typeof statusCode === "number") {
    return apiResponse.validationError(messageOrErrors, errorsOrStatus, statusCode);
  }

  if (typeof errorsOrStatus === "number") {
    return apiResponse.validationError("Validation failed.", messageOrErrors, errorsOrStatus);
  }

  return apiResponse.validationError(messageOrErrors, errorsOrStatus, 422);
};
