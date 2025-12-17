import { errorResponse, validationErrorResponse } from "../utils/responseFormatter.js";

async function NotFoundHandler(request, reply) {
  reply.status(404).send(
    errorResponse("Route not found", {
      path: request.url,
      service: "authentication-service",
    })
  );
}

async function InternalServerErrorHandler(error, request, reply) {
  request.log.error(error);

  if (error.validation) {
    const errors = error.validation.map((err) => {
      const field =
        err.instancePath?.replace("/", "") ||
        err.params?.missingProperty ||
        "unknown";
      const message = err.message || "Validation failed";
      return {
        field: field,
        message: message,
        value: err.params,
      };
    });

    return reply.status(400).send(validationErrorResponse(errors));
  }

  reply.status(error.statusCode || 500).send(
    errorResponse(
      error.statusCode === 500 ? "Internal server error" : error.message
    )
  );
}

export default {
  NotFoundHandler,
  InternalServerErrorHandler,
};
