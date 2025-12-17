import utils from "./utils.js";

async function processRequest(fastify, request, reply) {
  const urlPath = request.url.split("/")[1];
  const matchedServices = await utils.checkServiceLinks(
    fastify.services,
    urlPath
  );

  if (!matchedServices) {
    return reply.code(404).send({ error: "Service not found" });
  }

  const remainingPath = request.url.substring(urlPath.length + 1);
  const fullUrl = matchedServices.url + remainingPath;

  try {
    const cleanHeaders = {};
    const skipHeaders = [
      "host",
      "content-length",
      "connection",
      "transfer-encoding",
    ];

    for (const [key, value] of Object.entries(request.headers)) {
      if (!skipHeaders.includes(key.toLowerCase())) {
        cleanHeaders[key] = value;
      }
    }

    const fetchOptions = {
      method: request.method,
      headers: cleanHeaders,
    };

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      if (request.body) {
        const bodyString =
          typeof request.body === "string"
            ? request.body
            : JSON.stringify(request.body);
        fetchOptions.headers["content-length"] =
          Buffer.byteLength(bodyString).toString();
      }
    }

    const response = await fetch(fullUrl, fetchOptions);
    const responseData = await response.json().catch(() => ({}));

    return reply.code(response.status).send(responseData);
  } catch (error) {
    console.error("Fetch error:", error.message);
    return reply.code(503).send({
      error: `Service unavailable: ${error.message}`,
    });
  }
}

export async function proxy(fastify) {
  fastify.route({
    method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    url: "/*",
    handler: processRequest.bind(this, fastify),
  });
}
