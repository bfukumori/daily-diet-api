import { User } from '@prisma/client';
import {
  CreateParams,
  IUsersRepository,
  UpdateParams,
} from '../users-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersRepository implements IUsersRepository {
  async getMetrics(
    userId: string
  ): Promise<Pick<User, 'bestStreak' | 'currentStreak'> | null> {
    const metrics = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        bestStreak: true,
        currentStreak: true,
      },
    });
    return metrics;
  }

  async updateUser({
    userId,
    bestStreak,
    currentStreak,
  }: UpdateParams): Promise<void> {
    await prisma.user.update({
      data: {
        bestStreak,
        currentStreak,
      },
      where: {
        id: userId,
      },
    });
  }

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

  async create({ email, password, username }: CreateParams): Promise<User> {
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
