import Fastify from "fastify";
import { registration } from "./plugins/registration.js";
import sequelize from "./config/database.js";

const fastify = Fastify({ logger: true });

async function start() {
  try {
    await sequelize.authenticate();
    fastify.log.info("Database connection established");
    await sequelize.sync({ alter: true });
    fastify.log.info("Database synchronized");
    await registration(fastify);
    await fastify.listen({ port: 3002, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

await start();
