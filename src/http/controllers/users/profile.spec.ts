import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Example name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send()

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: 'any_email@mail.com'
      })
    )
  })
})
