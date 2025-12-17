import fp from "fastify-plugin";
import { createClient } from "redis";

async function redisPlugin(fastify, options) {
  const redisUrl = process.env.REDIS_URL || "redis://redis:6379";

  const client = createClient({
    url: redisUrl,
  });

  client.on("error", (err) => {
    fastify.log.error("Redis Client Error", err);
  });

  client.on("connect", () => {
    fastify.log.info("Redis Client Connected");
  });

  await client.connect();

  fastify.addHook("onClose", async () => {
    await client.quit();
  });

  fastify.decorate("redis", client);
}

export default fp(redisPlugin);
