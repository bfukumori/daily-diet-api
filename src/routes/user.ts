import { create } from '@/http/controllers/users/create';
import { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create);

  app.get('/users/metrics', () => {
    console.log("TODO: get an user's metrics");
  });
}
