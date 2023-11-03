import { Meal } from '@prisma/client';

export interface CreateParams {
  name: string;
  description: string;
  inDiet: boolean;
  userId: string;
  date: Date;
}

export interface UpdateParams {
  id: string;
  name: string;
  description: string;
  inDiet: boolean;
  date: Date;
}

export interface FindManyByUserIDParams {
  userId: string;
  page: number;
}

export interface IMealsRepository {
  create: (params: CreateParams) => Promise<Meal>;
  findByID: (id: string) => Promise<Meal | null>;
  findManyByUserID: (params: FindManyByUserIDParams) => Promise<Meal[]>;
  update: (params: UpdateParams) => Promise<Meal>;
  delete: (id: string) => Promise<void>;
  totalInDiet: (userId: string) => Promise<number>;
  totalMeals: (userId: string) => Promise<number>;
}
