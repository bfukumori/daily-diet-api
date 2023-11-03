import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { RegisterMealService } from './register-meal';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryMetricsRepository } from '@/repositories/in-memory/in-memory-get-user-metrics-repository';

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let metricsRepository: InMemoryMetricsRepository;
let sut: RegisterMealService;
let userId = '';
let metricId = '';

describe('Register meal service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    mealsRepository = new InMemoryMealsRepository();
    metricsRepository = new InMemoryMetricsRepository();
    sut = new RegisterMealService(mealsRepository, metricsRepository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;
    const { id: createdMetricId } = await metricsRepository.createMetrics(
      userId
    );
    metricId = createdMetricId;

    await metricsRepository.updateMetrics({
      bestStreak: 0,
      currentStreak: 0,
      id: metricId,
    });
  });

  it('should be able to register a meal', async () => {
    const { meal } = await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    expect(meal.id).toEqual(expect.any(String));
  });
});
