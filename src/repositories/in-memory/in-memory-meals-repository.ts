import { randomUUID } from 'node:crypto';
import {
  CreateMealParams,
  FindManyByUserIDParams,
  IMealsRepository,
  UpdateMealParams,
} from '../meals-repository';
import { Meal } from '@prisma/client';

export class InMemoryMealsRepository implements IMealsRepository {
  public meals: Meal[] = [];

  async totalInDiet() {
    const meals = this.meals.filter((meal) => meal.inDiet === true);

    return meals.length;
  }

  async totalMeals() {
    return this.meals.length;
  }

  async findByID(id: string) {
    const meal = this.meals.find((meal) => meal.id === id);

    if (!meal) {
      return null;
    }

    return meal;
  }

  async findManyByUserID({ userId, page }: FindManyByUserIDParams) {
    return this.meals
      .filter((meals) => meals.userId === userId)
      .slice((page - 1) * 10, 10 * page);
  }

  async update({ description, id, inDiet, name, date }: UpdateMealParams) {
    const mealIndex = this.meals.findIndex((meal) => meal.id === id);

    if (mealIndex >= 0) {
      this.meals[mealIndex].name = name;
      this.meals[mealIndex].description = description;
      this.meals[mealIndex].inDiet = inDiet;
      this.meals[mealIndex].date = date;
    }

    return this.meals[mealIndex];
  }

  async create({ description, inDiet, name, date, userId }: CreateMealParams) {
    const meal = {
      id: randomUUID(),
      name,
      description,
      inDiet,
      date,
      userId,
      createdAt: new Date(),
    };

    this.meals.push(meal);

    return meal;
  }

  async delete(id: string) {
    const mealIndex = this.meals.findIndex((meal) => meal.id === id);

    if (mealIndex > 0) {
      this.meals.splice(mealIndex, 1);
    }
  }
}
