import { PrismaGetUserMetricsRepository } from '@/repositories/prisma/prisma-get-user-metrics-repository';
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { GetUserMetricsService } from '@/services/get-user-metrics';

export function makeGetUserMetricsService() {
  const mealsRepository = new PrismaMealsRepository();
  const metricsRepository = new PrismaGetUserMetricsRepository();
  const getUserMetricsService = new GetUserMetricsService(
    metricsRepository,
    mealsRepository
  );

  return getUserMetricsService;
}
