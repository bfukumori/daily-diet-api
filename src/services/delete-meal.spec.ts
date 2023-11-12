import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { DeleteMealService } from './delete-meal';
import { NotFoundError } from './errors/NotFoundError';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UnauthorizedError } from './errors/UnauthorizedError';

let usersRepository: InMemoryUsersRepository;
let mealsRespository: InMemoryMealsRepository;
let sut: DeleteMealService;
let userId = '';

describe('Delete meal service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    mealsRespository = new InMemoryMealsRepository();
    sut = new DeleteMealService(mealsRespository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;
  });

  it('should be able to delete a specific meal', async () => {
    await mealsRespository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: false,
      userId,
    });

    const { id } = await mealsRespository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    await sut.execute({ id, userId });

    const meals = mealsRespository.meals;
    expect(meals).toHaveLength(1);
    expect(meals[0].name).toEqual('Katsudon');
  });

  it('should not be able to delete an inexistent meal', async () => {
    await expect(() =>
      sut.execute({ id: 'inexistent id', userId })
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to delete another's meal", async () => {
    const { id } = await mealsRespository.create({
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
