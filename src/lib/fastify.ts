import { mealRoutes } from '@/routes/meals';
import { userRoutes } from '@/routes/user';
import Fastify from 'fastify';
import { ZodError } from 'zod';

export const app = Fastify();

app.register(userRoutes);
app.register(mealRoutes);
app.setErrorHandler((error, _req, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  return reply.status(500).send({ message: 'Internal server error' });
});
