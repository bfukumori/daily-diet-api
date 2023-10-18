import { Meal } from '@/models/Meal';

export interface IMealsRepository {
  create: () => Promise<Meal>;
  findByID: (id: string) => Promise<Meal | null>;
  findManyByUserID: (userId: string, page: number) => Promise<Meal[]>;
  update: () => Promise<Meal>;
  delete: () => Promise<void>;
}
