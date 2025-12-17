import userRoutes from "./user/schema.js";
import sessionRoutes from "./session/schema.js";
import tokenRoutes from "./token/schema.js";

export default async function authRoutes(fastify, options) {
  await userRoutes(fastify, options);
  await sessionRoutes(fastify, options);
  await tokenRoutes(fastify, options);
}
