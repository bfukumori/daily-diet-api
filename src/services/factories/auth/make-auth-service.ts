import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateService } from '@/services/authenticate';

export function makeAuthService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
