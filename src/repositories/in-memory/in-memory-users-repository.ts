import { User } from '@prisma/client';
import {
  CreateParams,
  IUsersRepository,
  UpdateParams,
} from '../users-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async getMetrics(
    userId: string
  ): Promise<Pick<User, 'bestStreak' | 'currentStreak'> | null> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex < 0) {
      return null;
    }

    return {
      bestStreak: this.users[userIndex].bestStreak,
      currentStreak: this.users[userIndex].currentStreak,
    };
  }

  async updateUser({
    bestStreak,
    currentStreak,
    userId,
  }: UpdateParams): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex >= 0) {
      this.users[userIndex].bestStreak = bestStreak;
      this.users[userIndex].currentStreak = currentStreak;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create({ email, password, username }: CreateParams): Promise<User> {
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
