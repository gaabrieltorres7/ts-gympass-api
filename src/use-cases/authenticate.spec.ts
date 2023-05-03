import { it, expect, describe } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate useCase', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password_hash: await hash('valid_password', 6)
    })

    const { user } = await sut.execute({
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect( () =>
      sut.execute({
        email: 'valid_email@mail.com',
        password: 'valid_password'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})
