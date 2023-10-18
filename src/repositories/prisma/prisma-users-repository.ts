import { User } from '@/models/User';
import { CreateParams, IUsersRepository } from '../users-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUsersRepository implements IUsersRepository {
  public users: User[] = [];

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
