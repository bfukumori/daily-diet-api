import { IMealsRepository } from '@/repositories/meals-repository';
import { Meal } from '@prisma/client';
import { NotFoundError } from './errors/NotFoundError';
import { IMetricsRepository } from '@/repositories/metrics-repository';

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
    private metricsRepository: IMetricsRepository
  ) {}

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

    const metrics = await this.metricsRepository.getuserMetrics(userId);

    if (!metrics) {
      throw new NotFoundError();
    }

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

    await this.metricsRepository.updateMetrics({
      id: metrics.id,
      bestStreak: tempBest,
      currentStreak: tempCurrent,
    });

    return { meal };
  }
}
