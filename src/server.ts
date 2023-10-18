import { env } from './env';
import { app } from './lib/fastify';

const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: env.PORT });
    console.log(`🚀 Server listening on port ${env.PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
