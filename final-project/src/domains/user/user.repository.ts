// src/domains/user/user.repository.ts
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/generated/prisma'

export const getAllUsers = () => {
  return prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
}

export const getUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } })
}

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } })
}

export const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  phonenumber,
  role = UserRole.CUSTOMER
}: {
  firstname: string
  lastname: string
  email: string
  password: string
  phonenumber: string
  role?: UserRole
}) => {
  return prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password,
      phonenumber,
      role
    }
  })
}

export const deleteUser = (id: number) => {
  return prisma.user.delete({ where: { id } })
}

export const updateUser = (id: number, data: Partial<{
  firstname: string
  lastname: string
  email: string
  role: UserRole
  phonenumber: string
}>) => {
  return prisma.user.update({
    where: { id },
    data
  })
}
