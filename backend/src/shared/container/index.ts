import { container } from "tsyringe";
import { ITokenProvider } from "./providers/Tokenprovider/ITokenProvider";
import { JWTTokenProvider } from "./providers/Tokenprovider/JWTTokenProvider";

container.registerSingleton<ITokenProvider>("TokenProvider", JWTTokenProvider);
