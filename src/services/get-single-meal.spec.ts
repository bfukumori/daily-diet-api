import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { GetSingleMealService } from './get-single-meal';
import { NotFoundError } from './errors/NotFoundError';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UnauthorizedError } from './errors/UnauthorizedError';

let usersRepository: InMemoryUsersRepository;
let mealsRepository: InMemoryMealsRepository;
let sut: GetSingleMealService;
let userId = '';

describe('Get single meal service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    mealsRepository = new InMemoryMealsRepository();
    sut = new GetSingleMealService(mealsRepository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;
  });

  it('should be able to list a specific meal', async () => {
    await mealsRepository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: false,
      userId,
    });

    const { id } = await mealsRepository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    const { meal } = await sut.execute({ id, userId });

    expect(meal).toEqual(
      expect.objectContaining({
        id,
        name: 'Ramen',
        description: 'Noodles are the best',
      })
    );
  });

  it('should not be able to list an inexistent meal', async () => {
    await expect(() =>
      sut.execute({ id: 'inexistent id', userId })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to list another's meal", async () => {
    const { id } = await mealsRepository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    await expect(() =>
      sut.execute({ id, userId: 'another-user-id' })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
