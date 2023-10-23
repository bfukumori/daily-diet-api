import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';

interface DeleteMealServiceRequest {
  userId: string;
  id: string;
}

export class DeleteMealService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute({ id, userId }: DeleteMealServiceRequest): Promise<void> {
    const meal = await this.mealsRepository.findByID(id);

    if (!meal) {
      throw new NotFoundError();
    }

    if (meal.userId !== userId) {
      throw new UnauthorizedError();
    }

    await this.mealsRepository.delete(id);
  }
}
