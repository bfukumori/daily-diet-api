import { UserMetrics } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { IMetricsRepository, UpdateMetricsParams } from '../metrics-repository';

export class PrismaGetUserMetricsRepository implements IMetricsRepository {
  async createMetrics(userId: string) {
    const metrics = await prisma.userMetrics.create({
      data: {
        userId,
        bestStreak: 0,
        currentStreak: 0,
      },
    });
    return metrics;
  }

  async updateMetrics({ bestStreak, currentStreak, id }: UpdateMetricsParams) {
    await prisma.userMetrics.update({
      data: {
        bestStreak,
        currentStreak,
      },
      where: {
        id,
      },
    });
  }

  async getuserMetrics(userId: string): Promise<UserMetrics | null> {
    const metrics = await prisma.userMetrics.findUnique({
      where: {
        userId,
      },
    });

    if (!metrics) {
      return null;
    }

    return metrics;
  }
}
