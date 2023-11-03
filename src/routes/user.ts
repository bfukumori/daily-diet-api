import { create } from '@/http/controllers/users/create';
import { metrics } from '@/http/controllers/users/metrics';
import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create);

  app.get(
    '/users/metrics',
    {
      onRequest: [verifyJWT],
    },
    metrics
  );
}
