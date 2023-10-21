import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';

export class DeleteMealService {
  constructor(private mealsRepository: IMealsRepository) {}

  async execute(id: string): Promise<void> {
    const meal = await this.mealsRepository.findByID(id);

    if (!meal) {
      throw new NotFoundError();
    }

    await this.mealsRepository.delete(id);
  }
}
