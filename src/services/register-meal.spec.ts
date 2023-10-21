import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { RegisterMealService } from './register-meal';
import { randomUUID } from 'node:crypto';

let inMemoryMealsRespository: InMemoryMealsRepository;
let sut: RegisterMealService;

describe.only('Register meal service', () => {
  beforeEach(() => {
    inMemoryMealsRespository = new InMemoryMealsRepository();
    sut = new RegisterMealService(inMemoryMealsRespository);
  });

  it('should be able to register a meal', async () => {
    const { meal } = await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId: randomUUID(),
    });

    expect(meal.id).toEqual(expect.any(String));
  });
});
