import { GymsRepository } from '@/repositories/gyms-repository';
import { CheckInsRepository } from '../repositories/check-ins-repository'
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse  {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private CheckInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym) throw new ResourceNotFoundError()

    //calculate distance

    const checkInOnSameDate = await this.CheckInsRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnSameDate) throw new Error()

    const checkIn = await this.CheckInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return { checkIn }
  }
}