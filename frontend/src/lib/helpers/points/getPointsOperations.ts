import { Point } from '@/interfaces/point';
import { getMedianPoints } from './getMedianPoints';

interface OperationResults {
  sumPoints: number;
  avgPoints: number;
  medianPoints: number;
}

export const getPointsOperations = (points: Point[]): OperationResults => {
  const sumPoints = points.reduce(
    // garantindo que poi_counts é um número
    (accumulator, point) => accumulator + Number(point.poi_counts),
    0
  );
  const avgPoints = sumPoints / points.length;
  const medianPoints = getMedianPoints(points);

  return {
    sumPoints,
    avgPoints,
    medianPoints,
  };
};
