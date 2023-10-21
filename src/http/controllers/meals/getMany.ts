import { NotFoundError } from '@/services/errors/NotFoundError';
import { makeGetManyMealsService } from '@/services/factories/meals/make-get-many-meals-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getMany(req: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = querySchema.parse(req.query);

  try {
    const meals = await makeGetManyMealsService().execute({
      page,
      userId: 'ca465052-72d7-4bb6-8dce-23f5ccfabbd2',
    });
    return reply.status(200).send(meals);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
