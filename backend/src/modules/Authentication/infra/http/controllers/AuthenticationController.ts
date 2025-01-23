import { AuthenticateUser } from "@modules/Authentication/services/AuthenticateUser";
import { CreateUser } from "@modules/Authentication/services/CreateUser";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class AuthenticationController {
  async createUser(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const createUser = container.resolve(CreateUser);
    const newUserData = {
      name,
      email,
      password
    };

    const result = await createUser.execute(newUserData);

    return res.status(200).json(result);
  }

  async authenticateUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUser = container.resolve(AuthenticateUser);

    const result = await authenticateUser.execute({ email, password });
    return res.status(200).json(result);
  }
}
