import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { RegisterMealService } from '@/services/register-meal';

export function makeRegisterMealService() {
  const mealsRepository = new PrismaMealsRepository();
  const registerMealService = new RegisterMealService(mealsRepository);

  return registerMealService;
}
