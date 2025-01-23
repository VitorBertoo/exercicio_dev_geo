import { Router } from "express";
import { PointsController } from "../controller/PointsController";
import { ensureAuthenticated } from "@shared/http/middlewares/ensureAuthenticated";

export const PointRouter = Router();

const pointsController = new PointsController();

PointRouter.get("/", ensureAuthenticated, pointsController.getPoints);
