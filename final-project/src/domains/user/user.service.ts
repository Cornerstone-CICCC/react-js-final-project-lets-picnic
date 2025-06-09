// src/domains/user/user.service.ts
import * as userRepo from './user.repository'
import bcrypt from 'bcrypt'

export const registerUser = async ({
  firstname,
  lastname,
  email,
  password,
  phonenumber
}: {
  firstname: string
  lastname: string
  email: string
  password: string
  phonenumber: string
}) => {
  const existing = await userRepo.getUserByEmail(email)
  if (existing) throw new Error('Email already exists')

  const hashedPassword = await bcrypt.hash(password, 10)

  return userRepo.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    phonenumber
  })
}

export const getUserProfile = (id: number) => userRepo.getUserById(id)