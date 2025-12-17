import Fastify from 'fastify'
import { registration } from './plugins/registration.js'

const fastify = Fastify({ 
    logger: true,
    bodyLimit: 1048576 // 1MB
})

async function start()
{
    try 
    {
        // Add JSON body parser
        fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
            try {
                const json = JSON.parse(body);
                done(null, json);
            } catch (err) {
                err.statusCode = 400;
                done(err, undefined);
            }
        });
        
        await registration(fastify);
        await fastify.proxy(fastify);
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
    }
    catch (err)
    {
      fastify.log.error(err)
      process.exit(1)
    }
}

await start();

