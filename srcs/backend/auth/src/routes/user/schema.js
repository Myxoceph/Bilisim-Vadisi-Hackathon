import userController from "../../controllers/users/userController.js";

export async function userRoutes(fastify, options) {
  fastify.post(
    "/users",
    {
      schema: {
        body: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: { type: "string" },
            email: { type: "string" } ,
            password: { type: "string"},
          },
        },
      },
    },
    userController.registerUser
  );
  fastify.delete(
    "/users/:id",
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
    userController.deleteUser
  );
  fastify.get(
    "/users/:id",
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
    userController.getUser
  );
  fastify.patch(
    "/users/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    userController.updateUser
  );
}

export default userRoutes;  