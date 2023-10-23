import { NotFoundError } from '@/services/errors/NotFoundError';
import { makeGetManyMealsService } from '@/services/factories/meals/make-get-many-meals-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getManyMeals(req: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = querySchema.parse(req.query);
  const userId = req.user.sub;

  try {
    const meals = await makeGetManyMealsService().execute({
      page,
      userId,
    });
    return reply.status(200).send(meals);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
