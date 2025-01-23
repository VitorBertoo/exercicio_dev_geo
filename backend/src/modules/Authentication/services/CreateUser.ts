import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IHashProvider } from "../providers/HashProvider/IHashProvider";
import { ITokenProvider } from "@shared/container/providers/Tokenprovider/ITokenProvider";
import { UserDTO } from "../interfaces/DTOs/UserDTO";
import { AppError } from "@shared/errors/AppError";
import { AuthUserResponse } from "../interfaces/responses/AuthUser";

@injectable()
export class CreateUser {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("TokenProvider")
    private tokenProvider: ITokenProvider
  ) {}

  async execute({ email, name, password }: UserDTO): Promise<AuthUserResponse> {
    // Usuário deve ter um email único
    const emailInUse = await this.userRepository.find({ email });
    if (emailInUse) throw new AppError("Email já está cadastrado!");

    const user = await this.userRepository.create({
      name,
      email,
      password: await this.hashProvider.hash(password)
    });

    const token = await this.tokenProvider.sign({ userId: user.id });

    return {
      user,
      token: token.toString()
    };
  }
}
