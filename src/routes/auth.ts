import { authenticate } from '@/http/controllers/auth/authenticate';
import { FastifyInstance } from 'fastify';

export async function authRoutes(app: FastifyInstance) {
  app.post('/session', authenticate);

  app.post('/refresh-token', () => {
    console.log('TODO: get a new token');
  });
}
