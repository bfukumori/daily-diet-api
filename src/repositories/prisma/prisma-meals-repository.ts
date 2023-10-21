import { prisma } from '@/lib/prisma';
import {
  CreateParams,
  FindManyByUserIDParams,
  IMealsRepository,
  UpdateParams,
} from '../meals-repository';
import { Meal } from '@/models/Meal';

export class PrismaMealsRepository implements IMealsRepository {
  public meals: Meal[] = [];

  async create({
    inDiet,
    name,
    description,
    userId,
  }: CreateParams): Promise<Meal> {
    const meal = await prisma.meal.create({
      data: {
        inDiet,
        name,
        description,
        userId,
      },
    });

    return meal;
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

  async update({ inDiet, name, description, id }: UpdateParams): Promise<Meal> {
    const meal = await prisma.meal.update({
      data: {
        inDiet,
        name,
        description,
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
