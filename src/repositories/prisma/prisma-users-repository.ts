import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../users-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create({
    email,
    password,
    username,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return user;
  }
}
