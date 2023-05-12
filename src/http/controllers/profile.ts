import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({ userId: req.user.sub })

  const { password_hash: _, ...userWithoutPassword } = user

  return res.status(200).send(userWithoutPassword)
}
