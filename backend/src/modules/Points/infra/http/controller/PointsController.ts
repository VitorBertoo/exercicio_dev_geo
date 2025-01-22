import { ReadPointsData } from "@modules/Points/services/ReadPointsData";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class PointsController {
  async getPoints(req: Request, res: Response): Promise<Response> {
    const readPoints = container.resolve(ReadPointsData);
    const points = await readPoints.execute();

    return res.status(200).json({ points });
  }
}
