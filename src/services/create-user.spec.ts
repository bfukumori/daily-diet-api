import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserService } from './create-user';
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError';
import { compare } from 'bcryptjs';

let usersRespository: InMemoryUsersRepository;
let sut: CreateUserService;

describe('Register user service', () => {
  beforeEach(() => {
    usersRespository = new InMemoryUsersRepository();
    sut = new CreateUserService(usersRespository);
  });

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash password at creation', async () => {
    const { user } = await sut.execute({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    const isPasswordHashed = await compare('123456', user.password);

    expect(isPasswordHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      email: 'goku@gmail.com',
      password: '123456',
      username: 'Goku',
    });

    await expect(() =>
      sut.execute({
        email: 'goku@gmail.com',
        password: '123456',
        username: 'Vegeta',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
