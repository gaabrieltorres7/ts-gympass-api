import { GymsRepository } from './../gyms-repository';
import { Gym } from "@prisma/client";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById (id: string) {
    const gym = this.items.find(user => user.id === id)

    if(!gym) {
      return null
    }

    return gym
  }
}