import { GymsRepository } from '@/repositories/gyms-repository';
import { CheckInsRepository } from '../repositories/check-ins-repository'
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { MaxNumberOfCheckInsError } from './errors/max-numbers-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

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

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if(!gym) throw new ResourceNotFoundError()

    const distance = getDistanceBetweenCoordinates(
    { latitude: userLatitude, longitude: userLongitude }, 
    { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if(distance > MAX_DISTANCE_IN_KM) throw new MaxDistanceError()

    const checkInOnSameDate = await this.CheckInsRepository.findByUserIdOnDate(userId, new Date())

    if(checkInOnSameDate) throw new MaxNumberOfCheckInsError()

    const checkIn = await this.CheckInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return { checkIn }
  }
}
