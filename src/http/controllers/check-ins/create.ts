import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';

export async function create(req: FastifyRequest, res: FastifyReply) {

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90, { message: 'Latitude must be between -90 and 90' }),
    longitude: z.number().refine((value) => Math.abs(value) <= 180, { message: 'Longitude must be between -180 and 180' }),
  })

  const { gymId } = createCheckInParamsSchema.parse(req.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({ 
    gymId, 
    userId: req.user.sub, 
    userLatitude: latitude, 
    userLongitude: longitude 
  })

  return res.status(201).send()

}

