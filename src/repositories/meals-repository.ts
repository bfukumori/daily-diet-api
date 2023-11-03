import { Meal } from '@prisma/client';

export interface FindManyByUserIDParams {
  userId: string;
  page: number;
}

export interface CreateMealParams {
  description: string;
  inDiet: boolean;
  name: string;
  date: Date;
  userId: string;
}

export interface UpdateMealParams {
  description: string;
  id: string;
  inDiet: boolean;
  name: string;
  date: Date;
}

export interface IMealsRepository {
  create: (params: CreateMealParams) => Promise<Meal>;
  findByID: (id: string) => Promise<Meal | null>;
  findManyByUserID: (params: FindManyByUserIDParams) => Promise<Meal[]>;
  update: (data: UpdateMealParams) => Promise<Meal>;
  delete: (id: string) => Promise<void>;
  totalInDiet: () => Promise<number>;
  totalMeals: () => Promise<number>;
}
