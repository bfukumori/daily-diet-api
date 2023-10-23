import { Meal } from '@/models/Meal';
import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';

interface GetSingleMealServiceRequest {
  id: string;
  userId: string;
}

interface GetSingleMealServiceResponse {
  meal: Meal;
}

export class GetSingleMealService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute({
    id,
    userId,
  }: GetSingleMealServiceRequest): Promise<GetSingleMealServiceResponse> {
    const meal = await this.mealsRepository.findByID(id);

    if (!meal) {
      throw new NotFoundError();
    }

    if (meal.userId !== userId) {
      throw new UnauthorizedError();
    }

    return { meal };
  }
}
