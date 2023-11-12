import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserMetricsService } from './get-user-metrics';
import { InMemoryMetricsRepository } from '@/repositories/in-memory/in-memory-get-user-metrics-repository';
import { NotFoundError } from './errors/NotFoundError';

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let metricsRepository: InMemoryMetricsRepository;
let sut: GetUserMetricsService;
let userId = '';

describe("Get user's metrics", () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    metricsRepository = new InMemoryMetricsRepository();
    sut = new GetUserMetricsService(metricsRepository, mealsRepository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;

    const { id: metricId } = await metricsRepository.createMetrics(userId);

    await mealsRepository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: true,
      userId,
    });

    await mealsRepository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: true,
      userId,
    });

    await mealsRepository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: false,
      userId,
    });

    await mealsRepository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: true,
      userId,
    });

    await metricsRepository.updateMetrics({
      bestStreak: 2,
      currentStreak: 1,
      id: metricId,
    });
  });

  it('should be able to get metrics (total meals, total in diet, total out diet and best streak)', async () => {
    const { metrics } = await sut.execute({
      userId,
    });

    expect(metrics).toEqual(
      expect.objectContaining({
        bestStreak: 2,
        currentStreak: 1,
        totalInDiet: 3,
        totalMeals: 4,
        totalOutDiet: 1,
      })
    );
  });

  it('should not be able to get metrics from unexistent user)', async () => {
    await expect(() =>
      sut.execute({
        userId: 'unexistent-user',
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
