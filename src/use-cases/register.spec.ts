import { it, expect, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

describe('Register useCase', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    const isPasswordHashed = await compare('valid_password', user.password_hash)

    expect(isPasswordHashed).toBe(true)

  }) 
})