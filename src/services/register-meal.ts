import { Meal } from '@/models/Meal';
import {
  CreateParams,
  IMealsRepository,
} from '@/repositories/meals-repository';

interface RegisterMealServiceResponse {
  meal: Meal;
}

export class RegisterMealService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute({
    inDiet,
    name,
    description,
    userId,
    date,
  }: CreateParams): Promise<RegisterMealServiceResponse> {
    const meal = await this.mealsRepository.create({
      inDiet,
      name,
      description,
      userId,
      date,
    });

    return { meal };
  }
}
