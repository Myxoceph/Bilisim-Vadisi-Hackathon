import fp from "fastify-plugin";
const publicPaths = [
  { method: "POST", path: /^\/auth\/login($|\?)/ },
  { method: "POST", path: /^\/auth\/users($|\?)/ },
  { method: "GET", path: /^\/health($|\?)/ },
  { method: "GET", path: /^\/swagger/ },
];

function isPublicPath(method, urlPath) {
  const pathWithoutQuery = urlPath.split("?")[0];
  return publicPaths.some(
    (p) => p.method === method && p.path.test(pathWithoutQuery)
  );
}

async function jwtPlugin(fastify, options) {
  await fastify.register(require("@fastify/jwt"), {
    secret:
      process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
  });

  fastify.addHook("preHandler", async (request, reply) => {
    try {
      if (isPublicPath(request.method, request.url)) {
        return;
      }
      await request.jwtVerify();
    } catch (err) {
      reply
        .code(401)
        .send({ message: "Unauthorized - Invalid or missing token" });
    }
  });
}

export default fp(jwtPlugin);
