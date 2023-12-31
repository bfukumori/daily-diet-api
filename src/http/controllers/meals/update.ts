import { NotFoundError } from '@/services/errors/NotFoundError';
import { UnauthorizedError } from '@/services/errors/UnauthorizedError';
import { makeUpdateMealService } from '@/services/factories/meals/make-update-meal-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateMeal(req: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    inDiet: z.boolean(),
    date: z.string().datetime(),
  });
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { name, description, inDiet, date } = bodySchema.parse(req.body);
  const { id } = paramsSchema.parse(req.params);
  const userId = req.user.sub;

  try {
    await makeUpdateMealService().execute({
      name,
      description,
      inDiet,
      id,
      date: new Date(date),
      userId,
    });

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
