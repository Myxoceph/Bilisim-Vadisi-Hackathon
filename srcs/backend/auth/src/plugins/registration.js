import authroutes from "../routes/index.js";
import utils from "./utils.js";
import redisPlugin from "./redis.js";
import fastifyJwt from "@fastify/jwt";

export async function registration(fastify) {
  await fastify.register(fastifyJwt, {
    secret:
      process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
  });
  await fastify.register(redisPlugin);
  await fastify.setNotFoundHandler(utils.NotFoundHandler);
  await fastify.setErrorHandler(utils.InternalServerErrorHandler);
  await fastify.register(authroutes);
}
