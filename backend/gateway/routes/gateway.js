/* import xss from 'xss'

function sanitizeValue(v) {
	if (typeof v === 'string') return xss(v)
	if (Array.isArray(v)) return v.map(sanitizeValue)
	if (v && typeof v === 'object') return sanitizeObject(v)
	return v
}

function sanitizeObject(obj) {
	const out = {}
	for (const k of Object.keys(obj || {})) {
		out[k] = sanitizeValue(obj[k])
	}
	return out
}
 */
async function processRequest(fastify, request, reply)
{
    return reply.code(200).send({ echo: "ok"})
}

export async function gateway(fastify) {
	fastify.route({
        method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		url: '/*',
		handler: processRequest
	})
}
