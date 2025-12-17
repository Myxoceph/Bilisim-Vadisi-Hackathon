import authroutes from "../routes/index.js";
import utils from "./utils.js";
import redisPlugin from "./redis.js";
import fastifyJwt from "@fastify/jwt";

export async function registration(fastify) {
  await fastify.register(fastifyJwt, {
    secret:
      process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
  });
  
  // JWT authentication decorator
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({
        success: false,
        error: err.message === "Authorization token expired" 
          ? "Token expired. Please refresh your token." 
          : "Invalid or missing token",
      });
    }
  });
  
  await fastify.register(redisPlugin);
  await fastify.setNotFoundHandler(utils.NotFoundHandler);
  await fastify.setErrorHandler(utils.InternalServerErrorHandler);
  await fastify.register(authroutes);
}
