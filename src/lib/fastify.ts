import { env } from '@/env';
import { authRoutes } from '@/routes/auth';
import { mealRoutes } from '@/routes/meals';
import { userRoutes } from '@/routes/user';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import Fastify from 'fastify';
import { ZodError } from 'zod';

export const app = Fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);
app.register(authRoutes);
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
