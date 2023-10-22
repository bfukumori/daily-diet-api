import { Meal } from '@/models/Meal';
import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';

interface UpdateMealServiceRequest {
  id: string;
  name: string;
  description: string;
  inDiet: boolean;
  date: Date;
}

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
    date,
  }: UpdateMealServiceRequest): Promise<UpdateMealServiceResponse> {
    const meal = await this.mealsRepository.findByID(id);

    if (!meal) {
      throw new NotFoundError();
    }

    const updatedMeal = await this.mealsRepository.update({
      inDiet,
      name,
      description,
      id,
      date,
    });

    return { meal: updatedMeal };
  }
}
