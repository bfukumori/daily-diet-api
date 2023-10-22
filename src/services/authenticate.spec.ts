import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateService } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';

let usersRespository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe('Authenticate user service', () => {
  beforeEach(async () => {
    usersRespository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRespository);

    await usersRespository.create({
      email: 'goku@gmail.com',
      password: await hash('123456', 12),
      username: 'Goku',
    });
  });

  it('should be able to authenticate an user', async () => {
    const { user } = await sut.execute({
      email: 'goku@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong-email',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'goku@gmail.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
