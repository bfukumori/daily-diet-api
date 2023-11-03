import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { GetManyMealsService } from './get-many-meals';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let mealsRespository: InMemoryMealsRepository;
let sut: GetManyMealsService;
let userId = '';

describe('Get many meals service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    mealsRespository = new InMemoryMealsRepository();
    sut = new GetManyMealsService(mealsRespository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;
  });

  it('should be able to list all meals from a user', async () => {
    await mealsRespository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: false,
      userId,
    });

    await mealsRespository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    await mealsRespository.create({
      name: 'Carbonara',
      description: 'Delicious spaghetti with pork and cheese',
      date: new Date(),
      inDiet: false,
      userId: 'another-user-id',
    });

    const { meals } = await sut.execute({
      userId,
      page: 1,
    });

    expect(meals).toHaveLength(2);
    expect(meals).toEqual([
      expect.objectContaining({
        name: 'Katsudon',
        description: 'Pork meat with rice',
        userId,
      }),
      expect.objectContaining({
        name: 'Ramen',
        description: 'Noodles are the best',
        userId,
      }),
    ]);
  });

  it('should be able to list paginated meals', async () => {
    for (let i = 1; i <= 12; i++) {
      await mealsRespository.create({
        name: `Meal-${i}`,
        description: 'Meal description',
        date: new Date(),
        inDiet: false,
        userId,
      });
    }

    const { meals } = await sut.execute({
      userId,
      page: 2,
    });

    expect(meals).toHaveLength(2);
    expect(meals).toEqual([
      expect.objectContaining({
        name: 'Meal-11',
      }),
      expect.objectContaining({
        name: 'Meal-12',
      }),
    ]);
  });
});
