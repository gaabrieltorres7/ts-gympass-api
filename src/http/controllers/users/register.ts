import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if(error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message })
    }

    return res.status(500).send() // fix this
    
  }

  return res.status(201).send({ message: 'User has been created succesfuly' })
}
