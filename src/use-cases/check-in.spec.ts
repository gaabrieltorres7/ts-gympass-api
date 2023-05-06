import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in useCase', () => {

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  }) 

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2021, 0, 1, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id'
    })

    await expect(() => sut.execute({
      gymId: 'gym-id',
      userId: 'user-id'
    })).rejects.toBeInstanceOf(Error)
    
  }) 
})