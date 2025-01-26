import { Point } from '@/interfaces/point';

export const getMedianPoints = (points: Point[]): number => {
  // transforma o array de pontos em um array de números (com o valor de poi_counts)
  const values = points.map(point => point.poi_counts).sort((a, b) => a - b);
  const middle = Math.floor(values.length / 2);

  if (values.length % 2 === 0) return (values[middle - 1] + values[middle]) / 2;

  return values[middle];
};
