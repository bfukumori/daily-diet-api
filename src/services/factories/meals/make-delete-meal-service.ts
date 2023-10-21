import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { DeleteMealService } from '@/services/delete-meal';

export function makeDeleteMealService() {
  const mealsRepository = new PrismaMealsRepository();
  const deleteMealService = new DeleteMealService(mealsRepository);

  return deleteMealService;
}
