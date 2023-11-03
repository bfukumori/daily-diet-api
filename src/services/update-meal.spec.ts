import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { UpdateMealService } from './update-meal';
import { NotFoundError } from './errors/NotFoundError';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UnauthorizedError } from './errors/UnauthorizedError';

let usersRepository: InMemoryUsersRepository;
let mealsRespository: InMemoryMealsRepository;
let sut: UpdateMealService;
let userId = '';

describe('Update meal service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    mealsRespository = new InMemoryMealsRepository();
    sut = new UpdateMealService(mealsRespository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;
  });

  it('should be able to update a meal', async () => {
    const { id } = await mealsRespository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    const { meal } = await sut.execute({
      name: 'Udon',
      description: 'Japanese cozy noodles',
      date: new Date(),
      inDiet: true,
      id,
      userId,
    });

    expect(meal).toEqual(
      expect.objectContaining({
        name: 'Udon',
        description: 'Japanese cozy noodles',
      })
    );
  });

  it('should not be able to update an inexistent meal', async () => {
    await expect(() =>
      sut.execute({
        name: 'Udon',
        description: 'Japanese cozy noodles',
        date: new Date(),
        inDiet: true,
        id: 'inexistent-id',
        userId,
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to update another's meal", async () => {
    const { id } = await mealsRespository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    await expect(() =>
      sut.execute({
        name: 'Udon',
        description: 'Japanese cozy noodles',
        date: new Date(),
        inDiet: true,
        id,
        userId: 'another-user-id',
      })
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
