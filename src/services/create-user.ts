import { UserAlreadyExistsError } from '@/services/errors/UserAlreadyExistsError';
import { IUsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { IMetricsRepository } from '@/repositories/metrics-repository';

interface CreateUserServiceRequest {
  email: string;
  username: string;
  password: string;
}

interface CreateUserServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private metricsRepository: IMetricsRepository
  ) {}

  async execute({
    email,
    username,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 12);

    const user = await this.usersRepository.create({
      email,
      username,
      password: passwordHash,
    });

    await this.metricsRepository.createMetrics(user.id);

    return { user };
  }
}
