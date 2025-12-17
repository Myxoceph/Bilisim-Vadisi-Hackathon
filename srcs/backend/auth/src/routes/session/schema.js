import "../../controllers/session/sessionController.js";

async function sessionRoutes(fastify, options) {
    fastify.post(
        "/sessions",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string" },
                        password: { type: "string" },
                    },
                },
            },
        },
        sessionController.createSession
    );
    fastify.delete(
        "/sessions/:id",
        {
            schema: {
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                    },
                    required: ["id"],
                },
            },
        },
        sessionController.deleteSession
    );
}

export default sessionRoutes;