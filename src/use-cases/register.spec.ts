import { it, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register useCase', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    expect(user).toHaveProperty('id')
  }) 

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    const isPasswordHashed = await compare('valid_password', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  }) 

  it('should not be able to register with same email twice', async () => {
    const email = 'same_email@mail.com'

    await sut.execute({
      name: 'any_name',
      email: email,
      password: 'valid_password'
    })

    expect(() => sut.execute({
      name: 'any_name',
      email: email,
      password: 'valid_password'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})