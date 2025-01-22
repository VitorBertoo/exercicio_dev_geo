import { Router } from "express";
import { PointsController } from "../controller/PointsController";

export const PointRouter = Router();

const pointsController = new PointsController();

PointRouter.get("/", pointsController.getPoints);
