import { IMealsRepository } from '@/repositories/meals-repository';
import { IUsersRepository } from '@/repositories/users-repository';
import { Meal } from '@prisma/client';
import { NotFoundError } from './errors/NotFoundError';

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
  constructor(
    private mealsRepository: IMealsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    inDiet,
    name,
    description,
    userId,
    date,
  }: RegisterMealServiceRequest): Promise<RegisterMealServiceResponse> {
    const metrics = await this.usersRepository.getMetrics(userId);

    if (!metrics) {
      throw new NotFoundError();
    }

    const meal = await this.mealsRepository.create({
      inDiet,
      name,
      description,
      userId,
      date,
    });

    const { bestStreak, currentStreak } = metrics;

    let tempCurrent = currentStreak;
    let tempBest = bestStreak;

    if (inDiet) {
      tempCurrent += 1;
    } else {
      tempCurrent = 0;
    }

    if (tempCurrent > tempBest) {
      tempBest = tempCurrent;
    }

    await this.usersRepository.updateUser({
      userId,
      bestStreak: tempBest,
      currentStreak: tempCurrent,
    });

    return { meal };
  }
}
