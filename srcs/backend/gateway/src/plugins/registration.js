import { proxy } from "../routes/proxy.js";
import services from "../config/services.json" with { type: "json" };
import utils from "./utils.js";

export async function registration(fastify) 
{
    
    await fastify.setNotFoundHandler( utils.NotFoundHandler );
	await fastify.setErrorHandler( utils.InternalServerErrorHandler );
    await fastify.decorate('services', services);
    await fastify.decorate('proxy', proxy);
}
