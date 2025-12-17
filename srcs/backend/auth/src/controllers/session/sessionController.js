import { successResponse, errorResponse } from "../../utils/responseFormatter.js";

async function createSession(request, reply) {
  const { userId, token } = request.body;

  if (!userId || !token) {
    return reply.code(400).send(errorResponse("userId and token are required"));
  }

  try {
    request.log.info({ userId }, "Creating session for user");

    reply.code(201).send(
      successResponse(
        {
          sessionId: "session_" + Date.now(),
          userId: userId,
          createdAt: new Date().toISOString(),
        },
        "Session created successfully"
      )
    );
  } catch (error) {
    request.log.error({ error: error.message, userId }, "Session creation error");
    reply.code(500).send(errorResponse("Failed to create session"));
  }
}

async function deleteSession(request, reply) {
  const { sessionId } = request.params;

  try {
    request.log.info({ sessionId }, "Deleting session");

    reply.code(200).send(successResponse(null, "Session deleted successfully"));
  } catch (error) {
    request.log.error({ error: error.message, sessionId }, "Session deletion error");
    reply.code(500).send(errorResponse("Failed to delete session"));
  }
}

export default {
  createSession,
  deleteSession,
};
