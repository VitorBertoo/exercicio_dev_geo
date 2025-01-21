import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { JWTTokenProvider } from "@shared/container/providers/Tokenprovider/JWTTokenProvider";

interface ITokenPayload {
  name: string;
}

export async function ensureAuthenticated(request: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("JWT token is missing", 401);

    const [, token] = authHeader.split(" ");

    const jwtProvider = container.resolve(JWTTokenProvider);

    const decoded = await jwtProvider.verify(token);

    if (!decoded) throw new AppError("Invalid JWT token", 401);

    const { name } = decoded as ITokenPayload;
    request.user = {
      name
    };

    return next();
  } catch (ex) {
    next(ex);
  }
}
