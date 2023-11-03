import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository';
import { RegisterMealService } from './register-meal';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let mealsRepository: InMemoryMealsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: RegisterMealService;
let userId = '';

describe('Get single meal service', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    mealsRepository = new InMemoryMealsRepository();
    sut = new RegisterMealService(mealsRepository, usersRepository);

    const { id } = await usersRepository.create({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    userId = id;
  });

  it('should be able to register a meal', async () => {
    const { meal } = await sut.execute({
      name: 'Ramen',
      description: 'Noodles are the best',
      date: new Date(),
      inDiet: false,
      userId,
    });

    expect(meal.id).toEqual(expect.any(String));
  });
});
