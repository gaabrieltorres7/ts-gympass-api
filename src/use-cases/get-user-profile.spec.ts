import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile useCase', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
    
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password_hash: await hash('valid_password', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
  })
  
  it('should not be able to get user profile with wrong id', async () => {
    expect( () =>
      sut.execute({
        userId: 'invalid_id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
