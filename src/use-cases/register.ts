import { PrismaUsersRepository } from './../repositories/prisma-users-repository';
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseProps) {
  const password_hash = await hash(password, 6)

  const isEmailAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (isEmailAlreadyExists) {
    throw new Error('Email already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })

}