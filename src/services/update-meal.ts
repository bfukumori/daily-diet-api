import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { Meal } from '@prisma/client';

interface UpdateMealServiceRequest {
  id: string;
  name: string;
  description: string;
  inDiet: boolean;
  date: Date;
  userId: string;
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
    userId,
  }: UpdateMealServiceRequest): Promise<UpdateMealServiceResponse> {
    const meal = await this.mealsRepository.findByID(id);

    if (!meal) {
      throw new NotFoundError();
    }

    if (meal.userId !== userId) {
      throw new UnauthorizedError();
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
