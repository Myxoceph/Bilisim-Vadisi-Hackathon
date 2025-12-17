async function createSession(request, reply) {
  const { userId, token } = request.body;

  if (!userId || !token) {
    return reply.code(400).send({ message: "userId and token are required" });
  }

  try {
    console.log("Creating session for user:", userId);

    reply.code(201).send({
      sessionId: "session_" + Date.now(),
      userId: userId,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Session creation error:", error);
    reply.code(500).send({ message: "Failed to create session" });
  }
}

async function deleteSession(request, reply) {
  const { sessionId } = request.params;

  try {
    console.log("Deleting session:", sessionId);

    reply.code(200).send({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Session deletion error:", error);
    reply.code(500).send({ message: "Failed to delete session" });
  }
}

export default {
  createSession,
  deleteSession,
};
