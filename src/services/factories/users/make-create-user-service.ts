import { PrismaGetUserMetricsRepository } from '@/repositories/prisma/prisma-get-user-metrics-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserService } from '@/services/create-user';

export function makeCreateUserService() {
  const usersRepository = new PrismaUsersRepository();
  const metricsRepository = new PrismaGetUserMetricsRepository();
  const createUserService = new CreateUserService(
    usersRepository,
    metricsRepository
  );

  return createUserService;
}
