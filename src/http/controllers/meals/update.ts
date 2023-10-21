import { NotFoundError } from '@/services/errors/NotFoundError';
import { makeUpdateMealService } from '@/services/factories/meals/make-update-meal-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    inDiet: z.boolean(),
  });
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { name, description, inDiet } = bodySchema.parse(req.body);
  const { id } = paramsSchema.parse(req.params);

  try {
    await makeUpdateMealService().execute({
      name,
      description,
      inDiet,
      id,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
  }
}
