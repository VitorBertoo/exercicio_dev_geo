import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { JWTTokenProvider } from "@shared/container/providers/Tokenprovider/JWTTokenProvider";

interface ITokenPayload {
  id: string;
  name: string;
  email: string;
}

export async function ensureAuthenticated(request: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("Você precisa estar autenticado para acessar esta rota", 401);

    const [, token] = authHeader.split(" ");

    const jwtProvider = container.resolve(JWTTokenProvider);

    const decoded = await jwtProvider.verify(token);

    if (!decoded) throw new AppError("Token inválido, tente realizar login novamente", 401);

    const { id, name, email } = decoded as ITokenPayload;
    request.user = {
      id,
      name,
      email
    };

    return next();
  } catch (ex) {
    next(ex);
  }
}
