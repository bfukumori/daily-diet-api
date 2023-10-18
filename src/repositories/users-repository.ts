import { User } from '@/models/User';

export interface CreateParams {
  email: string;
  username: string;
  password: string;
}

export interface IUsersRepository {
  create: (params: CreateParams) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}
