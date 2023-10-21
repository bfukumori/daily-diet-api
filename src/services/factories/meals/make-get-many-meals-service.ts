import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository';
import { GetManyMealsService } from '@/services/get-many-meals';

export function makeGetManyMealsService() {
  const mealsRepository = new PrismaMealsRepository();
  const getManyMealsService = new GetManyMealsService(mealsRepository);

  return getManyMealsService;
}
