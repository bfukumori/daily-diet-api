import { Meal } from '@/models/Meal';
import {
  IMealsRepository,
  UpdateParams,
} from '@/repositories/meals-repository';

interface UpdateMealServiceResponse {
  meal: Meal;
}

export class UpdateMealService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute({
    inDiet,
    name,
    description,
    id,
  }: UpdateParams): Promise<UpdateMealServiceResponse> {
    const meal = await this.mealsRepository.update({
      inDiet,
      name,
      description,
      id,
    });

    return { meal };
  }
}
