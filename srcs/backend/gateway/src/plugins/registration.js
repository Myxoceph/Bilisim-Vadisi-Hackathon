import { proxy } from "../routes/proxy.js";
import services from "../config/services.json" with { type: "json" };
import utils from "./utils.js";
import jwtPlugin from "./jwt.js";

export async function registration(fastify) 
{   
    fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done)
{
                try {
                    const json = JSON.parse(body);
                    done(null, json);
                } catch (err) {
                    err.statusCode = 400;
                    done(err, undefined);
                }
            });
            
    await fastify.register(jwtPlugin);
    await fastify.setNotFoundHandler( utils.NotFoundHandler );
	await fastify.setErrorHandler( utils.InternalServerErrorHandler );
    await fastify.decorate('services', services);
    await fastify.decorate('proxy', proxy);
}
