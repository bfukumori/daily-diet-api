import { UserAlreadyExistsError } from '@/services/errors/UserAlreadyExistsError';
import { User } from '@/models/User';
import {
  CreateParams,
  IUsersRepository,
} from '@/repositories/users-repository';
import { hash } from 'bcryptjs';

interface CreateUserServiceResponse {
  user: User;
}

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    username,
    password,
  }: CreateParams): Promise<CreateUserServiceResponse> {
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

    return { user };
  }
}
