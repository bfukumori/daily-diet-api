import { UserMetrics } from '@prisma/client';

export interface UpdateMetricsParams {
  id: string;
  bestStreak: number;
  currentStreak: number;
}

export interface IMetricsRepository {
  getuserMetrics: (userId: string) => Promise<UserMetrics | null>;
  updateMetrics: (params: UpdateMetricsParams) => Promise<void>;
  createMetrics: (userId: string) => Promise<UserMetrics>;
}
