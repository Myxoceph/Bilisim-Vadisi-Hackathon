import { gateway } from "../routes/gateway.js";

export async function registration(fastify) 
{
    fastify.decorate('gateway', gateway);
}
