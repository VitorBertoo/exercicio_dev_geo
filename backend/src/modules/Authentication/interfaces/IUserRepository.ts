import { UserDTO } from "./DTOs/UserDTO";

export interface IUserRepository {
  create(user: UserDTO): Promise<UserDTO>;
  find(filter: Partial<UserDTO>): Promise<UserDTO>;
}
