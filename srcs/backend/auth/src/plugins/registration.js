import authroutes from "../routes/index.js";
import utils from "./utils.js";

export async function registration(fastify) {
  await fastify.setNotFoundHandler( utils.NotFoundHandler );
	await fastify.setErrorHandler( utils.InternalServerErrorHandler );
  await fastify.register(authroutes);
}
