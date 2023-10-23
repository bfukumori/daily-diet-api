import { InvalidCredentialsError } from '@/services/errors/InvalidCredentialsError';
import { makeAuthService } from '@/services/factories/auth/make-auth-service';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(req.body);

  try {
    const { user } = await makeAuthService().execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );
    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
