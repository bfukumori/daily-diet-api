import { Meal } from './Meal';

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  meals?: Meal[];
  createdAt: Date;
};
