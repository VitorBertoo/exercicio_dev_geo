import { Feature, GeoJsonProperties, Geometry, Polygon } from 'geojson';
import { getPointsOperations } from '../points/getPointsOperations';
import { buildHtml } from './buildHtml';
import { Map, Popup } from 'mapbox-gl';
import { Point } from '@/interfaces/point';

import * as turf from '@turf/turf';

interface PolygonPopup {
  feature: Feature<Geometry, GeoJsonProperties>;
  polygonPopup: Popup;
  map: Map;
  points: Point[];
}

export const showPolygonPopup = ({
  feature,
  polygonPopup,
  map,
  points,
}: PolygonPopup) => {
  if (feature) {
    const polygon = feature.geometry as Polygon;
    const coordinates = polygon.coordinates[0][0]; // as coordenadas são arrays de arrays de arrays de números

    // mostra apenas os pontos dentro do polígono selecionado
    const pointsInPolygon = points.filter(marker =>
      turf.booleanPointInPolygon(
        turf.point([marker.longitude, marker.latitude]),
        polygon
      )
    );

    // montando o html do resultado das operações dos pontos
    const operationResults = getPointsOperations(pointsInPolygon);
    const htmlFormat = {
      'Quantitade pontos': pointsInPolygon.length,
      Soma: operationResults.sumPoints,
      Média: operationResults.avgPoints,
      Mediana: operationResults.medianPoints,
    };

    // mostrando o resultado das operações no popup
    // criando o polígono aqui pra evitar renderização desnecessária
    polygonPopup
      .setLngLat([coordinates[0], coordinates[1]])
      .setHTML(buildHtml(htmlFormat))
      .addTo(map);
  }
};
