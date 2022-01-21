import { Service } from 'typedi'
import prisma from 'app/helpers/client'
import { Prisma } from '@prisma/client'

@Service()
export class UserService {
  /**
   * Type 'Prisma.SessionCreateInput' is automatically generated.
   * Whenever you modify file 'prisma/schema.prisma' and then run command:
   *   prisma generate
   *   prisma migrate dev
   * The types is automatically updated.
   *
   * About CRUD: https://www.prisma.io/docs/concepts/components/prisma-client/crud
   */
  async register(userInfo: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: userInfo,
    })
  }

  async login(loginInfo: Prisma.UserWhereInput) {
    return prisma.user.findFirst({
      where: {
        username: loginInfo.username,
        password: loginInfo.password,
      },
    })
  }

  async getInfoById(data) {
    return prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    })
  }

  async updateInfo(updateInfo: Prisma.UserUpdateArgs) {
    return prisma.user.update({
      where: updateInfo.where,
      data: updateInfo.data,
    })
  }
}
