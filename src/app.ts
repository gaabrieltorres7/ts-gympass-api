import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)


app.setErrorHandler((error, req, res) => {
  if(error instanceof ZodError) {
    return res.status(400).send({ message: 'Validation failed', issues: error.format() })
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  }else {
    // todo: log to an external service
  }

  return res.status(500).send({ message: 'Internal server error' })
})
