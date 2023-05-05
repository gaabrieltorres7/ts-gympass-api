import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate useCase', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
    
  it('should be able to authenticate', async () => {
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
    await expect( () =>
      sut.execute({
        email: 'valid_email@mail.com',
        password: 'valid_password'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password_hash: await hash('valid_password', 6)
    })

    await expect( () =>
      sut.execute({
        email: 'valid_email@mail.com',
        password: 'invalid_password'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
