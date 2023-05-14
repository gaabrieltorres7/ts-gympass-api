import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Any Name',
      email: 'any_email@mail.com',
      password_hash: await hash('any_password', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'any_email@mail.com',
    password: 'any_password',
  })

  const { token } = authResponse.body

  return { token }
}
