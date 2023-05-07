import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym useCase', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'any_title',
      description: null,
      phone: null,
      latitude: 27.0058687,
      longitude: -48.6581834
    })

    expect(gym).toHaveProperty('id')
  }) 
})