import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { GetSingleMealService } from './get-single-meal';
import { randomUUID } from 'node:crypto';
import { NotFoundError } from './errors/NotFoundError';

let mealsRespository: InMemoryMealsRepository;
let sut: GetSingleMealService;

describe.only('Get single meal service', () => {
  beforeEach(() => {
    mealsRespository = new InMemoryMealsRepository();
    sut = new GetSingleMealService(mealsRespository);
  });

  it('should be able to list a specific meal', async () => {
    await mealsRespository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: false,
      userId: randomUUID(),
    });

    const { id } = await mealsRespository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId: randomUUID(),
    });

    const { meal } = await sut.execute(id);

    expect(meal).toEqual(
      expect.objectContaining({
        id,
        name: 'Ramen',
        description: 'Noodles are the best',
      })
    );
  });

  it('should not be able to list an inexistent meal', async () => {
    await expect(() => sut.execute('inexistent id')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
