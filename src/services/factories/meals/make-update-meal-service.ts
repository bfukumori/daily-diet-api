import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { UpdateMealService } from '@/services/update-meal';

export function makeUpdateMealService() {
  const mealsRepository = new PrismaMealsRepository();
  const updateMealService = new UpdateMealService(mealsRepository);

  return updateMealService;
}
