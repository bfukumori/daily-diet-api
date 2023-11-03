import { Meal } from '@prisma/client';
import { IMealsRepository } from '@/repositories/meals-repository';

interface GetManyMealsServiceRequest {
  userId: string;
  page: number;
}

interface GetManyMealsServiceResponse {
  meals: Meal[];
}

export class GetManyMealsService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute({
    userId,
    page = 1,
  }: GetManyMealsServiceRequest): Promise<GetManyMealsServiceResponse> {
    const meals = await this.mealsRepository.findManyByUserID({ userId, page });

    return { meals };
  }
}
