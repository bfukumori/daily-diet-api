import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { RegisterMealService } from './register-meal';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryMetricsRepository } from '@/repositories/in-memory/in-memory-get-user-metrics-repository';
import { NotFoundError } from './errors/NotFoundError';

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

  it('should not be able to register a meal from an unexistent user', async () => {
    await expect(() =>
      sut.execute({
        name: 'Ramen',
        description: 'Noodles are the best',
        date: new Date(),
        inDiet: false,
        userId: 'non-existent user',
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should add +1 to diet strike if in diet', async () => {
    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: true,
      userId,
    });
    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: true,
      userId,
    });

    const metrics = await metricsRepository.getuserMetrics(userId);

    expect(metrics?.currentStreak).toEqual(2);
    expect(metrics?.bestStreak).toEqual(2);
  });

  it('should not add +1 to diet strike if out diet', async () => {
    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });
    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    const metrics = await metricsRepository.getuserMetrics(userId);

    expect(metrics?.currentStreak).toEqual(0);
    expect(metrics?.bestStreak).toEqual(0);
  });

  it('should not replace best streak if current streak is under lower than best strike ', async () => {
    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: true,
      userId,
    });
    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: true,
      userId,
    });

    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: true,
      userId,
    });

    const metrics = await metricsRepository.getuserMetrics(userId);

    expect(metrics?.currentStreak).toEqual(1);
    expect(metrics?.bestStreak).toEqual(2);
  });
});
