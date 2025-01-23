import { AuthenticationRouter } from "@modules/Authentication/infra/http/routes/authentication.router";
import { PointRouter } from "@modules/Points/infra/http/routes/points.router";
import { Router } from "express";

export const router = Router();

router.use("/user", AuthenticationRouter);
router.use("/points", PointRouter);
