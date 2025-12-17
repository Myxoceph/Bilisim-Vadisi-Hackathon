import Fastify from "fastify";
import { registration } from "./plugins/registration.js";

const fastify = Fastify({
  logger: true,
  bodyLimit: 1048576,
});

async function start() {
  try {
    await registration(fastify);
    await fastify.proxy(fastify);
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

await start();
