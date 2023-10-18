import { userRoutes } from '@/routes/user';
import Fastify from 'fastify';

export const app = Fastify();

app.register(userRoutes);
