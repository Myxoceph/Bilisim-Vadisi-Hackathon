import tokenController from "../../controllers/token/tokenController.js";

async function tokenRoutes(fastify, options) {
  fastify.post(
    "/token/refresh",
    {
      schema: {
        body: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: { type: "string" },
          },
        },
      },
    },
    tokenController.refreshToken
  );
}

export default tokenRoutes;
