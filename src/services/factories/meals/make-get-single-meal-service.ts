import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { GetSingleMealService } from '@/services/get-single-meal';

export function makeGetSingleMealService() {
  const mealsRepository = new PrismaMealsRepository();
  const getSingleMealService = new GetSingleMealService(mealsRepository);

  return getSingleMealService;
}
