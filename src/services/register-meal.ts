import { Meal } from '@/models/Meal';
import { IMealsRepository } from '@/repositories/meals-repository';

interface RegisterMealServiceRequest {
  name: string;
  description: string;
  inDiet: boolean;
  userId: string;
  date: Date;
}

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
  }: RegisterMealServiceRequest): Promise<RegisterMealServiceResponse> {
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
