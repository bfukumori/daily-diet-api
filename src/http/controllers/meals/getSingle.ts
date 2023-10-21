import { NotFoundError } from '@/services/errors/NotFoundError';
import { makeGetSingleMealService } from '@/services/factories/meals/make-get-single-meal-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getSingle(req: FastifyRequest, reply: FastifyReply) {
  const queryParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = queryParams.parse(req.params);

  try {
    const meal = await makeGetSingleMealService().execute(id);

    return reply.status(200).send(meal);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
