import { Point } from '@/interfaces/point';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Polygon } from 'geojson';
import { RefObject, SetStateAction } from 'react';
import * as turf from '@turf/turf';

/* resolvi separar a função para facilitar a leitura do componente */
export const updateSelectedMarkers = (
  points: Point[],
  drawRef: RefObject<MapboxDraw | null>,
  setSelectedMarkers: (value: SetStateAction<Point[]>) => void
) => {
  if (drawRef.current) {
    const data = drawRef.current.getAll();
    if (data.features.length) {
      let selected: Point[] = [];

      data.features.forEach(polygon => {
        // isso acaba passando por todos os marcadores
        // forma mais eficiente?
        const filteredPoints = points.filter(marker =>
          turf.booleanPointInPolygon(
            turf.point([marker.longitude, marker.latitude]),
            // pegando apenas o geometry da feature (evita erro de typescript)
            polygon.geometry as Polygon
          )
        );

        selected = [...selected, ...filteredPoints];
      });

      // evita valores duplicados (caso poligonos sejam criados um em cima do outro)
      const uniqueValues = selected.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      setSelectedMarkers(uniqueValues);
    } else {
      setSelectedMarkers([]);
    }
  }
};
