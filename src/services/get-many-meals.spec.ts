import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { GetManyMealsService } from './get-many-meals';

let inMemoryMealsRespository: InMemoryMealsRepository;
let sut: GetManyMealsService;

describe.only('Get many meals service', () => {
  beforeEach(() => {
    inMemoryMealsRespository = new InMemoryMealsRepository();
    sut = new GetManyMealsService(inMemoryMealsRespository);
  });

  it('should be able to list all meals from a user', async () => {
    await inMemoryMealsRespository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: false,
      userId: '30d5f00f-bb96-489f-a1af-d250ae85b2b0',
    });

    await inMemoryMealsRespository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId: '30d5f00f-bb96-489f-a1af-d250ae85b2b0',
    });

    await inMemoryMealsRespository.create({
      name: 'Carbonara',
      description: 'Delicious spaghetti with pork and cheese',
      date: new Date(),
      inDiet: false,
      userId: 'ca465052-72d7-4bb6-8dce-23f5ccfabbd2',
    });

    const { meals } = await sut.execute({
      userId: '30d5f00f-bb96-489f-a1af-d250ae85b2b0',
      page: 1,
    });

    expect(meals).toHaveLength(2);
    expect(meals).toEqual([
      expect.objectContaining({
        name: 'Katsudon',
        description: 'Pork meat with rice',
      }),
      expect.objectContaining({
        name: 'Ramen',
        description: 'Noodles are the best',
      }),
    ]);
  });

  it('should be able to list paginated meals', async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemoryMealsRespository.create({
        name: `Meal-${i}`,
        description: 'Meal description',
        date: new Date(),
        inDiet: false,
        userId: '30d5f00f-bb96-489f-a1af-d250ae85b2b0',
      });
    }

    const { meals } = await sut.execute({
      userId: '30d5f00f-bb96-489f-a1af-d250ae85b2b0',
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
