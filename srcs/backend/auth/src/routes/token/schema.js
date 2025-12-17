import tokenController from '../../controllers/token/controller.js';

async function tokenRoutes(fastify, options) {
    fastify.post(
        '/tokens',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['refreshToken'],
                    properties: {
                        refreshToken: { type: 'string' },
                    },
                },
            },
        },
        tokenController.refreshTokenToken
    );   
}