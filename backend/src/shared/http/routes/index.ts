import { PointRouter } from "@modules/Points/infra/http/routes/points.router";
import { Router } from "express";

export const router = Router();

router.use("/points", PointRouter);
