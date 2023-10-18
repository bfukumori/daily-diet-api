import { UserAlreadyExistsError } from '@/services/errors/UserAlreadyExistsError';
import { makeCreateUserService } from '@/services/factories/users/make-create-user-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password, username } = bodySchema.parse(req.body);

  try {
    await makeCreateUserService().execute({
      email,
      password,
      username,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}
