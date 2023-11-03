import { PrismaGetUserMetricsRepository } from '@/repositories/prisma/prisma-get-user-metrics-repository';
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { RegisterMealService } from '@/services/register-meal';

export function makeRegisterMealService() {
  const mealsRepository = new PrismaMealsRepository();
  const metricsRepository = new PrismaGetUserMetricsRepository();
  const registerMealService = new RegisterMealService(
    mealsRepository,
    metricsRepository
  );

  return registerMealService;
}
