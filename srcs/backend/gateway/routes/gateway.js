import utils from './utils.js'

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
async function processRequest(request, reply)
{
	const urlPath = request.url.split('/')[1];
	const matchedServices = await utils.checkServiceLinks(fastify.services, urlPath);
	
	if (!matchedServices) {
		return reply.code(404).send({ error: "Service not found" });
	}
	
	const remainingPath = request.url.substring(urlPath.length + 1);
	const fullUrl = matchedServices.url + remainingPath;
	
	console.log("Routing to:", fullUrl);
	
	try {
		// Clean headers - remove problematic ones
		const cleanHeaders = {};
		const skipHeaders = ['host', 'content-length', 'connection', 'transfer-encoding'];
		
		for (const [key, value] of Object.entries(request.headers)) {
			if (!skipHeaders.includes(key.toLowerCase())) {
				cleanHeaders[key] = value;
			}
		}
		
		const fetchOptions = {
			method: request.method,
			headers: cleanHeaders
		};
		
		// Include body for methods that support it
		if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
			if (request.body) {
				const bodyString = typeof request.body === 'string' 
					? request.body 
					: JSON.stringify(request.body);
				fetchOptions.body = bodyString;
				fetchOptions.headers['content-type'] = 'application/json';
				fetchOptions.headers['content-length'] = Buffer.byteLength(bodyString).toString();
			}
		}
		
		const response = await fetch(fullUrl, fetchOptions);
		const responseData = await response.json().catch(() => ({}));
		
		return reply.code(response.status).send(responseData);
	} catch (error) {
		console.error("Fetch error:", error.message);
		return reply.code(503).send({
			error: `Service unavailable: ${error.message}`
		});
	}
}

export async function gateway(fastify) {
	fastify.route({
        method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		url: '/*',
		handler: processRequest.bind(this, fastify)
	})
}
