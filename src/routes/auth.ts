import { FastifyInstance } from 'fastify';

export async function authRoutes(app: FastifyInstance) {
  app.post('/session', () => {
    console.log('TODO: auth an user');
  });

  app.post('/refresh-token', () => {
    console.log('TODO: get a new token');
  });
}
