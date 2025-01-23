import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

export const AuthenticationRouter = Router();

const authenticationController = new AuthenticationController();

AuthenticationRouter.post("/", authenticationController.createUser);
AuthenticationRouter.post("/login", authenticationController.authenticateUser);
