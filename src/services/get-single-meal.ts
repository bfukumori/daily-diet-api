import { Meal } from '@/models/Meal';
import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';

interface GetSingleMealServiceResponse {
  meal: Meal;
}

export class GetSingleMealService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute(id: string): Promise<GetSingleMealServiceResponse> {
    const meal = await this.mealsRepository.findByID(id);

    if (!meal) {
      throw new NotFoundError();
    }

    return { meal };
  }
}
