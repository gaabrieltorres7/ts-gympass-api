import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })
    const { password_hash: _, ...userWithoutPassword } = user

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
      .status(200)
      .send({
        message: 'Authenticated succesfuly',
        userWithoutPassword,
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: error.message })
    }

    return res.status(500).send() // fix this
  }
}
