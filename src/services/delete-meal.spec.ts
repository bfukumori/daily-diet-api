import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { randomUUID } from 'node:crypto';
import { DeleteMealService } from './delete-meal';
import { NotFoundError } from './errors/NotFoundError';

let inMemoryMealsRespository: InMemoryMealsRepository;
let sut: DeleteMealService;

describe.only('Delete meal service', () => {
  beforeEach(() => {
    inMemoryMealsRespository = new InMemoryMealsRepository();
    sut = new DeleteMealService(inMemoryMealsRespository);
  });

  it('should be able to delete a specific meal', async () => {
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

    await sut.execute(id);

    const meals = inMemoryMealsRespository.meals;
    expect(meals).toHaveLength(1);
    expect(meals[0].name).toEqual('Katsudon');
  });

  it('should not be able to delete an inexistent meal', async () => {
    await expect(() => sut.execute('inexistent id')).rejects.toBeInstanceOf(
      NotFoundError
    );
  });
});
