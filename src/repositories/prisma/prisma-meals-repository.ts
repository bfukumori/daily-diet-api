import { prisma } from '@/lib/prisma';
import {
  CreateMealParams,
  FindManyByUserIDParams,
  IMealsRepository,
} from '../meals-repository';
import { Meal, Prisma } from '@prisma/client';

export class PrismaMealsRepository implements IMealsRepository {
  async create({
    inDiet,
    name,
    description,
    date,
    userId,
  }: CreateMealParams): Promise<Meal> {
    const meal = await prisma.meal.create({
      data: {
        inDiet,
        name,
        description,
        date,
        userId,
      },
    });

    return meal;
  }

  async totalMeals(): Promise<number> {
    const meals = await prisma.meal.count();

    return meals;
  }

  async totalInDiet(): Promise<number> {
    const meals = await prisma.meal.count({
      where: {
        inDiet: true,
      },
    });

    return meals;
  }

  async findByID(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    });

    return meal;
  }

  async findManyByUserID({
    page,
    userId,
  }: FindManyByUserIDParams): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
      take: 10,
      skip: (page - 1) * 10,
    });

    return meals;
  }

  async update(data: Prisma.MealUpdateInput): Promise<Meal> {
    return await prisma.meal.update({
      data,
      where: {
        id: data.id as string,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.meal.delete({
      where: {
        id,
      },
    });
  }
}
