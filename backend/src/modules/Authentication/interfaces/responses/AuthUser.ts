import { UserDTO } from "../DTOs/UserDTO";

export interface AuthUserResponse {
  user: UserDTO;
  token: string;
}
