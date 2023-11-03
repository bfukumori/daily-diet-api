import { prisma } from '@/lib/prisma';
import {
  CreateParams,
  FindManyByUserIDParams,
  IMealsRepository,
  UpdateParams,
} from '../meals-repository';
import { Meal } from '@prisma/client';

export class PrismaMealsRepository implements IMealsRepository {
  async create({
    inDiet,
    name,
    description,
    userId,
    date,
  }: CreateParams): Promise<Meal> {
    const meal = await prisma.meal.create({
      data: {
        inDiet,
        name,
        description,
        userId,
        date,
      },
    });

    return meal;
  }

  async totalMeals(userId: string): Promise<number> {
    const meals = await prisma.meal.count({
      where: {
        userId,
      },
    });

    return meals;
  }

  async totalInDiet(userId: string): Promise<number> {
    const meals = await prisma.meal.count({
      where: {
        userId,
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

  async update({
    inDiet,
    name,
    description,
    id,
    date,
  }: UpdateParams): Promise<Meal> {
    const meal = await prisma.meal.update({
      data: {
        inDiet,
        name,
        description,
        date,
      },
      where: {
        id,
      },
    });

    return meal;
  }

  async delete(id: string): Promise<void> {
    await prisma.meal.delete({
      where: {
        id,
      },
    });
  }
}
