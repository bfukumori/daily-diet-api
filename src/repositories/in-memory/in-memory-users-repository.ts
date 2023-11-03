import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

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
    const user = {
      id: randomUUID(),
      email,
      password,
      username,
      currentStreak: 0,
      bestStreak: 0,
      meals: [],
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
