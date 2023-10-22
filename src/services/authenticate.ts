import { IUsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { compare } from 'bcryptjs';

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: AuthenticateServiceRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
