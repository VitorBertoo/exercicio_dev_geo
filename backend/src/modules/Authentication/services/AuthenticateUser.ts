import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ITokenProvider } from "@shared/container/providers/Tokenprovider/ITokenProvider";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "../providers/HashProvider/IHashProvider";

@injectable()
export class AuthenticateUser {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("TokenProvider")
    private tokenProvider: ITokenProvider,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({ email, password }) {
    const user = await this.userRepository.find({ email });

    if (!user) throw new AppError("Usuário não encontrado");

    const passwordMatch = await this.hashProvider.compare(password, user.password);

    if (!passwordMatch) throw new AppError("Senha incorreta!");

    const token = await this.tokenProvider.sign({ id: user.id, email: user.email, name: user.name });

    return {
      user,
      token
    };
  }
}
