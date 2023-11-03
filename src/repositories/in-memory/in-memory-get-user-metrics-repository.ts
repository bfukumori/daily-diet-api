import { UserMetrics } from '@prisma/client';
import { IMetricsRepository, UpdateMetricsParams } from '../metrics-repository';
import { randomUUID } from 'crypto';

export class InMemoryMetricsRepository implements IMetricsRepository {
  public metrics: UserMetrics[] = [];

  async createMetrics(userId: string): Promise<UserMetrics> {
    const metric = {
      id: randomUUID(),
      userId,
      bestStreak: 0,
      currentStreak: 0,
    };

    this.metrics.push(metric);
    return metric;
  }

  async updateMetrics({
    bestStreak,
    currentStreak,
    id,
  }: UpdateMetricsParams): Promise<void> {
    const metricIndex = this.metrics.findIndex((metric) => metric.id === id);

    if (metricIndex >= 0) {
      this.metrics[metricIndex].bestStreak = bestStreak;
      this.metrics[metricIndex].currentStreak = currentStreak;
    }
  }

  async getuserMetrics(userId: string): Promise<UserMetrics | null> {
    const metrics = this.metrics.find((metric) => metric.userId === userId);

    if (!metrics) {
      return null;
    }

    return metrics;
  }
}
