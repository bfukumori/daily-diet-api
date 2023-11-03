import { User } from '@prisma/client';

export interface CreateParams {
  email: string;
  username: string;
  password: string;
}

export interface UpdateParams {
  currentStreak: number;
  bestStreak: number;
  userId: string;
}

export interface IUsersRepository {
  create: (params: CreateParams) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  updateUser: (params: UpdateParams) => Promise<void>;
  getMetrics: (
    userId: string
  ) => Promise<Pick<User, 'bestStreak' | 'currentStreak'> | null>;
}
