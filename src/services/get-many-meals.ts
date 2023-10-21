import { Meal } from '@/models/Meal';
import {
  FindManyByUserIDParams,
  IMealsRepository,
} from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';

interface GetManyMealsServiceResponse {
  meals: Meal[];
}

export class GetManyMealsService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute({
    userId,
    page = 1,
  }: FindManyByUserIDParams): Promise<GetManyMealsServiceResponse> {
    const meals = await this.mealsRepository.findManyByUserID({ userId, page });

    if (!meals) {
      throw new NotFoundError();
    }

    return { meals };
  }
}
