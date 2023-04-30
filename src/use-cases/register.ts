import { UsersRepository } from '@/repositories/users-repository';
import { hash } from "bcryptjs"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository){}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    const password_hash = await hash(password, 6)

    const isEmailAlreadyExists = await this.usersRepository.findByEmail(email)
  
    if (isEmailAlreadyExists) {
      throw new Error('Email already exists')
    }
  
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
  
}