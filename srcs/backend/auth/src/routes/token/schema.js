import tokenController from "../../controllers/token/tokenController.js";

async function tokenRoutes(fastify, options) {
  fastify.post(
    "/tokens",
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
    tokenController.refreshTokenToken
  );
}
export default tokenRoutes;
