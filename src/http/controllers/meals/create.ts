import { makeRegisterMealService } from '@/services/factories/meals/make-register-meal-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createMeal(req: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    inDiet: z.boolean(),
    userId: z.string().uuid(),
    date: z.string().datetime(),
  });

  const { name, description, inDiet, userId, date } = bodySchema.parse(
    req.body
  );

  await makeRegisterMealService().execute({
    name,
    description,
    inDiet,
    userId,
    date: new Date(date),
  });

  return reply.status(201).send();
}
