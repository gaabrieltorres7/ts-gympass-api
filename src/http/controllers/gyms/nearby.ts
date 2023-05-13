import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90, { message: 'Latitude must be between -90 and 90' }),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180, { message: 'Longitude must be between -180 and 180' }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({ userLatitude: latitude, userLongitude: longitude })

  return res.status(200).send({ gyms })

}

