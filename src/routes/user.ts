import { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', () => {
    console.log('TODO: create an user');
  });

  app.get('/users/metrics', () => {
    console.log("TODO: get an user's metrics");
  });
}
