import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterMealService } from '@/services/register-meal';

export function makeRegisterMealService() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const registerMealService = new RegisterMealService(
    mealsRepository,
    usersRepository
  );

  return registerMealService;
}
