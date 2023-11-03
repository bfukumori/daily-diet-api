import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
  create: (params: Prisma.UserCreateInput) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}
