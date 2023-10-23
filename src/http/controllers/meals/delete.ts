import { NotFoundError } from '@/services/errors/NotFoundError';
import { UnauthorizedError } from '@/services/errors/UnauthorizedError';
import { makeDeleteMealService } from '@/services/factories/meals/make-delete-meal-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteMeal(req: FastifyRequest, reply: FastifyReply) {
  const queryParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = queryParams.parse(req.params);
  const userId = req.user.sub;

  try {
    await makeDeleteMealService().execute({ id, userId });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(403).send({ message: error.message });
    }
  }
}
