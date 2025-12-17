export function successResponse(data, message = "Success", meta = {}) {
  return {
    success: true,
    message,
    data,
    ...(Object.keys(meta).length > 0 && { meta }),
  };
}

export function errorResponse(message, errors = null, statusCode = 500) {
  const response = {
    success: false,
    error: message,
  };

  if (errors) {
    response.errors = Array.isArray(errors) ? errors : [errors];
  }

  return response;
}

export function paginatedResponse(data, pagination) {
  return {
    success: true,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
    },
  };
}

export function validationErrorResponse(errors) {
  return {
    success: false,
    error: "Validation failed",
    errors: errors.map((err) => ({
      field: err.field || err.instancePath?.replace("/", "") || "unknown",
      message: err.message || "Invalid value",
      value: err.value,
    })),
  };
}

export default {
  successResponse,
  errorResponse,
  paginatedResponse,
  validationErrorResponse,
};
