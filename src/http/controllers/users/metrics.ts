import { NotFoundError } from '@/services/errors/NotFoundError';
import { makeGetUserMetricsService } from '@/services/factories/users/make-get-user-metrics-service';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.user.sub;

  try {
    const { metrics } = await makeGetUserMetricsService().execute({
      userId,
    });
    return reply.status(200).send({ metrics });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
