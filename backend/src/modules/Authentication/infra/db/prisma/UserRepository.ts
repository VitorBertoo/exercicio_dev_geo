import { UserDTO } from "@modules/Authentication/interfaces/DTOs/UserDTO";
import { IUserRepository } from "@modules/Authentication/interfaces/IUserRepository";
import { prisma } from "@shared/db/prisma/prismaClient";

export class UserRepository implements IUserRepository {
  async create(userData: UserDTO): Promise<UserDTO> {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }
    });

    return user;
  }

  async find(filter: Partial<UserDTO>): Promise<UserDTO> {
    const user = await prisma.user.findFirst({
      where: {
        ...filter,
        deleted_at: null
      }
    });

    return user;
  }
}
