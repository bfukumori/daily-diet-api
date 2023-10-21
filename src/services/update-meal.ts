import { Meal } from '@/models/Meal';
import {
  IMealsRepository,
  UpdateParams,
} from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';

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
    const meal = await this.mealsRepository.findByID(id);

    if (!meal) {
      throw new NotFoundError();
    }

    const updatedMeal = await this.mealsRepository.update({
      inDiet,
      name,
      description,
      id,
    });

    return { meal: updatedMeal };
  }
}
