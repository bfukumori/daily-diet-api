import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserMetricsService } from '@/services/get-user-metrics';

export function makeGetUserMetricsService() {
  const usersRepository = new PrismaUsersRepository();
  const mealsRepository = new PrismaMealsRepository();
  const getUserMetricsService = new GetUserMetricsService(
    usersRepository,
    mealsRepository
  );

  return getUserMetricsService;
}
