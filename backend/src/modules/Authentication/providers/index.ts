import { container } from "tsyringe";
import { IHashProvider } from "./HashProvider/IHashProvider";
import { BCryptHashProvider } from "./HashProvider/BcryptHashProvider";
import { IUserRepository } from "../interfaces/IUserRepository";
import { UserRepository } from "../infra/db/prisma/UserRepository";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
