import { IMealsRepository } from '@/repositories/meals-repository';
import { NotFoundError } from './errors/NotFoundError';
import { IUsersRepository } from '@/repositories/users-repository';

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
    private usersRepository: IUsersRepository,
    private mealsRepository: IMealsRepository
  ) {}

  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const metrics = this.usersRepository.getMetrics(userId);
    const totalMeals = this.mealsRepository.totalMeals(userId);
    const totalInDiet = this.mealsRepository.totalInDiet(userId);

    const totals = await Promise.all([totalMeals, totalInDiet, metrics]);

    if (!totals[0] || !totals[1] || !totals[2]) {
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
