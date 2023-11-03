import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';
import { IMetricsRepository } from '@/repositories/metrics-repository';

interface GetUserMetricsServiceRequest {
  userId: string;
}

interface GetUserMetricsServiceResponse {
  metrics: {
    currentStreak: number;
    bestStreak: number;
    totalMeals: number;
    totalInDiet: number;
    totalOutDiet: number;
  };
}

export class GetUserMetricsService {
  constructor(
    private metricsRepository: IMetricsRepository,
    private mealsRepository: IMealsRepository
  ) {}

  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const metrics = this.metricsRepository.getuserMetrics(userId);
    const totalMeals = this.mealsRepository.totalMeals();
    const totalInDiet = this.mealsRepository.totalInDiet();

    const totals = await Promise.all([totalMeals, totalInDiet, metrics]);

    if (!totals[2]) {
      throw new NotFoundError();
    }

    const totalOutDiet = totals[0] - totals[1];

    return {
      metrics: {
        bestStreak: totals[2].bestStreak,
        currentStreak: totals[2].currentStreak,
        totalInDiet: totals[1],
        totalMeals: totals[0],
        totalOutDiet,
      },
    };
  }
}
