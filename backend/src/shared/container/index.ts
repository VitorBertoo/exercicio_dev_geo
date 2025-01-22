import { container } from "tsyringe";
import { ITokenProvider } from "./providers/Tokenprovider/ITokenProvider";
import { JWTTokenProvider } from "./providers/Tokenprovider/JWTTokenProvider";
import { ICSVReaderProvider } from "./providers/CSVReaderProvider/ICSVReaderProvider";
import { NodeCSVReaderProvider } from "./providers/CSVReaderProvider/NodeCSVReaderProvider";

container.registerSingleton<ITokenProvider>("TokenProvider", JWTTokenProvider);
container.registerSingleton<ICSVReaderProvider>("CSVReaderProvider", NodeCSVReaderProvider);
