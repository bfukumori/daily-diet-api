import { getUserMetrics } from '@/http/controllers/metrics/getUserMetrics';
import { create } from '@/http/controllers/users/create';
import { verifyJWT } from '@/http/middlewares/verifyJWT';
import { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create);

  app.get(
    '/users/metrics',
    {
      onRequest: [verifyJWT],
    },
    getUserMetrics
  );
}
