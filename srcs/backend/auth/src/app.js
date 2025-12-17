import Fastify from "fastify";
import { registration } from "./plugins/registration.js";

const fastify = Fastify({ logger: true });

async function start() {
  try {
    await registration(fastify);
    await fastify.listen({ port: 3002, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

await start();
