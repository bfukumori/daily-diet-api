import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserMetricsService } from './get-user-metrics';

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: GetUserMetricsService;
let userId = '';

describe("Get user's metrics", () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserMetricsService(usersRepository, mealsRepository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;

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
});
