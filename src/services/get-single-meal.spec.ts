import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { GetSingleMealService } from './get-single-meal';
import { randomUUID } from 'node:crypto';

let inMemoryMealsRespository: InMemoryMealsRepository;
let sut: GetSingleMealService;

describe.only('Get single meal service', () => {
  beforeEach(() => {
    inMemoryMealsRespository = new InMemoryMealsRepository();
    sut = new GetSingleMealService(inMemoryMealsRespository);
  });

  it('should be able to list a specific meal', async () => {
    await inMemoryMealsRespository.create({
      name: 'Katsudon',
      description: 'Pork meat with rice',
      date: new Date(),
      inDiet: false,
      userId: randomUUID(),
    });

    const { id } = await inMemoryMealsRespository.create({
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
});
