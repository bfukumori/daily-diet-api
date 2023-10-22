import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { randomUUID } from 'node:crypto';
import { UpdateMealService } from './update-meal';
import { NotFoundError } from './errors/NotFoundError';

let inMemoryMealsRespository: InMemoryMealsRepository;
let sut: UpdateMealService;

describe.only('Update meal service', () => {
  beforeEach(() => {
    inMemoryMealsRespository = new InMemoryMealsRepository();
    sut = new UpdateMealService(inMemoryMealsRespository);
  });

  it('should be able to update a meal', async () => {
    const { id } = await inMemoryMealsRespository.create({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId: randomUUID(),
    });

    const { meal } = await sut.execute({
      name: 'Udon',
      description: 'Japanese cozy noodles',
      date: new Date(),
      inDiet: true,
      id,
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
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
